import { createMachine } from "xstate"
import { humanFileSize, shortenEthAddr, getCreator, getArweaveData } from "./utils"

const widgetMachine = (tokenId, contractAddress, platform) => {
  let baseLink

  switch (platform) {
    case "Solana":
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
      },
      baseLink,
      tokenId,
      contractAddress,
      platform,
    },
    states: {
      idle: {
        on: {
          FETCH_ARWEAVE: {
            target: "loading_arweave",
          },
        },
      },
      loading_arweave: {
        invoke: {
          src: () =>
            Promise.all([
              getCreator(contractAddress, tokenId, platform),
              getArweaveData(platform === "Solana" ? tokenId : contractAddress + ":" + tokenId, platform),
            ]),
          onDone: [
            {
              target: "started",
              cond: (context, event) => {
                context.creator = event.data[0]
                context.arweaveData = event.data[1]

                if (!!context.arweaveData.darkblock && context.arweaveData.darkblock.tags) {
                  context.arweaveData.darkblock.tags.forEach((tag) => {
                    if (tag.name === "ArtId") context.artId = tag.value
                    if (tag.name === "Description") context.display.details = tag.value
                  })
                }

                if (
                  !!context.creator.creator_address &&
                  !!context.artId &&
                  context.arweaveData.status !== "Not found" &&
                  context.arweaveData.status !== "Not Verified"
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
                        downloadable = false

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

                  return true
                } else {
                  return false
                }
              },
            },
            { target: "start_failure" },
          ],
          onError: { target: "start_failure" },
        },
      },
      started: {
        on: {
          CONNECT_WALLET: "wallet_connected",
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
