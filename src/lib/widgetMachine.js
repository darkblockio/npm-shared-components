import { createMachine } from "xstate"
import { humanFileSize, shortenEthAddr, getCreator, getArweaveData } from "./utils"
import { filterDarkblocks } from "./utils/filterDarkblocks"

const widgetMachine = (tokenId, contractAddress, platform, dev = false, dbConfig = null) => {
  let baseLink

  switch (platform) {
    case "Solana":
    case "Solana-Devnet":
      baseLink = "https://explorer.solana.com/address/"
      break

    case "Ethereum":
      baseLink = "https://opensea.io/"
      break

    default:
      baseLink = ""
  }

  return createMachine({
    id: "widget",
    initial: "idle",
    context: {
      creator: null,
      arweaveData: null,
      artId: null,
      display: {
        creator: "",
        creatorLink: "",
        fileFormat: "",
        fileSize: "",
        arweaveTX: "",
        arweaveTXLink: "",
        details: "",
        stack: [],
        rental: false,
        expireSeconds: null,
      },
      baseLink,
      tokenId,
      contractAddress,
      platform,
    },
    states: {
      no_wallet_loading: {},
      no_wallet: {
        invoke: {
          src: () =>
            Promise.all([
              getCreator(contractAddress, tokenId, platform, dev),
              getArweaveData(
                platform.toLowerCase().includes("solana") ? tokenId : contractAddress + ":" + tokenId,
                platform,
                dev
              ),
            ]),
          onDone: [
            {
              target: "no_wallet_loading",
              cond: (context, event) => {
                context.creator = event.data[0]
                context.arweaveData = event.data[1]
                context.display.expireSeconds = null

                if (!!context.arweaveData.darkblock && context.arweaveData.darkblock.tags) {
                  context.arweaveData.darkblock.tags.forEach((tag) => {
                    if (tag.name === "ArtId") context.artId = tag.value
                    if (tag.name === "Description") context.display.details = tag.value
                  })
                }

                if (context && context.arweaveData && context.arweaveData.info === "rental expired!") {
                  context.display.rental = true
                }

                if (context && context.arweaveData && context.arweaveData.expiration) {
                  context.display.expireSeconds = context.arweaveData.expiration.in_seconds
                }

                if (
                  !!context.creator.creator_address &&
                  !!context.artId &&
                  !!context.arweaveData.darkblock &&
                  !!context.arweaveData.dbstack &&
                  context.arweaveData.dbstack.length > 0
                ) {
                  context.display.creator = shortenEthAddr(context.creator.creator_address, platform) || ""
                  context.display.creatorLink = context.baseLink + context.creator.creator_address
                  context.display.fileFormat = context.arweaveData.darkblock.data.type || ""
                  context.display.fileSize = humanFileSize(context.arweaveData.darkblock.data.size) || ""
                  context.display.arweaveTX = context.arweaveData.darkblock.id || ""
                  context.display.arweaveTXLink = `https://viewblock.io/arweave/tx/${context.display.arweaveTX}`

                  if (context.arweaveData.dbstack) {
                    context.arweaveData.dbstack.map((db) => {
                      let artId,
                        details = "",
                        datecreated,
                        name = "",
                        downloadable = "false"

                      db.tags.forEach((tag) => {
                        if (tag.name === "ArtId") artId = tag.value
                        if (tag.name === "Description") details = tag.value
                        if (tag.name === "Date-Created") datecreated = tag.value
                        if (tag.name === "Downloadable") downloadable = tag.value
                        if (tag.name === "Name") name = tag.value

                        if (name === "" && details !== "") name = details
                      })

                      context.display.stack.push({
                        artId,
                        name,
                        details,
                        datecreated,
                        downloadable,
                        creatorLink: context.baseLink + context.creator.creator_address,
                        fileFormat: db.data.type || "",
                        fileSize: humanFileSize(db.data.size) || "",
                        arweaveTX: db.id || "",
                        arweaveTXLink: `https://viewblock.io/arweave/tx/${db.id}`,
                      })
                    })

                    context.display.stack.sort((a, b) => b.datecreated - a.datecreated)
                  }

                  let preFilteredStack = filterDarkblocks(context.display.stack, dbConfig)

                  context.display.stack = preFilteredStack

                  return true
                } else {
                  return true
                }
              },
            },
            { target: {} },
          ],
          onError: { target: {} },
        },
      },
      idle: {
        on: {
          NO_WALLET: { target: "no_wallet" },
          FETCH_ARWEAVE: {
            target: "loading_arweave",
          },
        },
      },
      loading_arweave: {
        invoke: {
          src: () =>
            Promise.all([
              getCreator(contractAddress, tokenId, platform, dev),
              getArweaveData(
                platform.toLowerCase().includes("solana") ? tokenId : contractAddress + ":" + tokenId,
                platform,
                dev
              ),
            ]),
          onDone: [
            {
              target: "started",
              cond: (context, event) => {
                context.creator = event.data[0]
                context.arweaveData = event.data[1]
                context.display.expireSeconds = null

                if (!!context.arweaveData.darkblock && context.arweaveData.darkblock.tags) {
                  context.arweaveData.darkblock.tags.forEach((tag) => {
                    if (tag.name === "ArtId") context.artId = tag.value
                    if (tag.name === "Description") context.display.details = tag.value
                  })
                }

                if (context && context.arweaveData && context.arweaveData.info === "rental expired!") {
                  context.display.rental = true
                }

                if (context && context.arweaveData && context.arweaveData.expiration) {
                  context.display.expireSeconds = context.arweaveData.expiration.in_seconds
                }

                if (
                  !!context.creator.creator_address &&
                  !!context.artId &&
                  !!context.arweaveData.darkblock &&
                  !!context.arweaveData.dbstack &&
                  context.arweaveData.dbstack.length > 0
                ) {
                  context.display.creator = shortenEthAddr(context.creator.creator_address, platform) || ""
                  context.display.creatorLink = context.baseLink + context.creator.creator_address
                  context.display.fileFormat = context.arweaveData.darkblock.data.type || ""
                  context.display.fileSize = humanFileSize(context.arweaveData.darkblock.data.size) || ""
                  context.display.arweaveTX = context.arweaveData.darkblock.id || ""
                  context.display.arweaveTXLink = `https://viewblock.io/arweave/tx/${context.display.arweaveTX}`

                  if (context.arweaveData.dbstack) {
                    context.arweaveData.dbstack.map((db) => {
                      let artId,
                        details = "",
                        datecreated,
                        name = "",
                        downloadable = "false"

                      db.tags.forEach((tag) => {
                        if (tag.name === "ArtId") artId = tag.value
                        if (tag.name === "Description") details = tag.value
                        if (tag.name === "Date-Created") datecreated = tag.value
                        if (tag.name === "Downloadable") downloadable = tag.value
                        if (tag.name === "Name") name = tag.value

                        if (name === "" && details !== "") name = details
                      })

                      context.display.stack.push({
                        artId,
                        name,
                        details,
                        datecreated,
                        downloadable,
                        creatorLink: context.baseLink + context.creator.creator_address,
                        fileFormat: db.data.type || "",
                        fileSize: humanFileSize(db.data.size) || "",
                        arweaveTX: db.id || "",
                        arweaveTXLink: `https://viewblock.io/arweave/tx/${db.id}`,
                      })
                    })

                    context.display.stack.sort((a, b) => b.datecreated - a.datecreated)
                  }

                  let preFilteredStack = filterDarkblocks(context.display.stack, dbConfig)

                  context.display.stack = preFilteredStack

                  return context.display.stack.length > 0
                } else {
                  return false
                }
              },
            },
            { target: "no_darkblock" },
          ],
          onError: { target: "start_failure" },
        },
      },
      started: {
        on: {
          CONNECT_WALLET: "wallet_connected",
        },
      },
      no_darkblock: {
        on: {
          RETRY: "idle",
        },
      },
      start_failure: {
        on: {
          RETRY: "idle",
        },
      },
      wallet_connected: {
        on: {
          SIGN: "signing",
          DISCONNECT_WALLET: "started",
        },
      },
      authenticated: {
        on: {
          DECRYPT: "decrypting",
          DISCONNECT_WALLET: "started",
        },
      },
      auth_failure: {
        on: {
          SIGN: "signing",
        },
      },
      decrypting: {
        on: {
          SUCCESS: "display",
          REJECT: "decrypt_error",
          DISCONNECT_WALLET: "started",
        },
      },
      decrypt_error: {},
      signing: {
        on: {
          SUCCESS: "authenticated",
          FAIL: "auth_failure",
          CANCEL: "wallet_connected",
        },
      },
      display: {
        on: {
          DISCONNECT_WALLET: "started",
        },
      },
    },
  })
}

export default widgetMachine
