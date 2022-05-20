import React, { useEffect, useState } from "react"
import Web3 from "web3"
import { storiesOf } from "@storybook/react"
import Header from "../lib/Header"
import Panel from "../lib/Panel"
import Player from "../lib/Player"
import Stack from "../lib/Stack"
import widgetMachine from "../lib/widgetMachine"
import * as utils from "../lib/utils"
import { useMachine } from "@xstate/react"
import "../lib/db.css"

const stories = storiesOf("State Machine", module)

const config = {
  customCssClass: "", // pass here a class name you plan to use
  debug: true, // debug flag to console.log some variables
  imgViewer: {
    // image viewer control parameters
    showRotationControl: true,
    autoHideControls: true,
    controlsFadeDelay: true,
  },
}

const widget = ({ tokenId, contractAddress, platform, stack = false }) => {
  const [state, send] = useMachine(() => widgetMachine(tokenId, contractAddress, platform))
  const [address, setAddress] = useState(null)
  const [web3, setWeb3] = useState(null)
  const [mediaURL, setMediaURL] = useState("")
  const [stackMediaURLs, setStackMediaURLs] = useState("")
  const [epochSignature, setEpochSignature] = useState(null)

  useEffect(() => {
    window.ethereum
      ? ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            // setAddress(accounts[0])
            let w3 = new Web3(ethereum)
            setWeb3(w3)
          })
          .catch((err) => console.log(err))
      : console.log("Please install MetaMask")
  }, [])

  useEffect(() => {
    if (state.value === "idle") {
      send({ type: "FETCH_ARWEAVE" })
    }

    if (state.value === "started") {
      const connectWallet = async () => {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          })

          if (accounts) {
            console.log("accounts: ", accounts)
            setAddress(accounts[0])
            send({ type: "CONNECT_WALLET" })
          }
        }
      }

      connectWallet()
    }

    if (state.value === "wallet_connected") {
      // send({ type: "SIGN" })
    }

    if (state.value === "signing") {
      authenticate(web3)
    }

    if (state.value === "authenticated") {
      send({ type: "DECRYPT" })
    }

    if (state.value === "decrypting") {
      setMediaURL(
        utils.getProxyAsset(
          state.context.artId,
          epochSignature,
          state.context.tokenId,
          state.context.contractAddress,
          null,
          platform
        )
      )

      let arrTemp = []
      state.context.display.stack.map((db) => {
        arrTemp.push(
          utils.getProxyAsset(
            db.artId,
            epochSignature,
            state.context.tokenId,
            state.context.contractAddress,
            null,
            platform
          )
        )
      })
      setStackMediaURLs(arrTemp)

      setTimeout(() => {
        send({ type: "SUCCESS" })
      }, 500)
    }

    if (state.value === "display") {
    }
  }, [state.value])

  const authenticate = async (w3) => {
    let signature
    let epoch = Date.now()
    let sessionToken = epoch + address
    let ownerDataWithOwner

    try {
      ownerDataWithOwner = await utils.getOwner(contractAddress, tokenId, platform, address)

      if (
        !ownerDataWithOwner ||
        !ownerDataWithOwner.owner_address ||
        ownerDataWithOwner.owner_address.toLowerCase() !== address.toLowerCase()
      ) {
        send({ type: "FAIL" })
      } else {
        signature = await signData(address, sessionToken, w3, () => {
          send({ type: "SUCCESS" })
        })
      }
    } catch (e) {
      console.log(e)
      signature ? send({ type: "FAIL" }) : send({ type: "CANCEL" })
    }

    setEpochSignature(epoch + "_" + signature)
  }

  const signData = (address, data, w3, cb) => {
    return new Promise((resolve, reject) => {
      const typedData = [
        {
          type: "string",
          name: "Message",
          value: data,
        },
      ]
      return w3.currentProvider.send(
        {
          method: "eth_signTypedData",
          params: [typedData, address],
        },
        (err, result) => {
          if (err) {
            return reject(err)
          }

          if (result.error) {
            reject(result.error.message)
          }

          if (typeof cb === "function") {
            cb()
          }
          resolve(result.result)
        }
      )
    })
  }

  if (stack) {
    return (
      <div>
        <p>contractAddress: {contractAddress}</p>
        <p>tokenId: {tokenId}</p>
        <p>platform: {platform}</p>

        <h1>Stack DB</h1>

        <div>
          <Stack state={state} authenticate={() => send({ type: "SIGN" })} urls={stackMediaURLs} />
        </div>
        {/* <pre>{JSON.stringify(stackMediaURLs, null, 2)}</pre> */}
        <pre>{state.context.arweaveData && JSON.stringify(state.context.arweaveData, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div>
      <p>contractAddress: {contractAddress}</p>
      <p>tokenId: {tokenId}</p>
      <p>platform: {platform}</p>

      <h1>Normal DB</h1>

      <div>
        <div className={config.customCssClass ? `DarkblockWidget-App ${config.customCssClass}` : `DarkblockWidget-App`}>
          {state.value === "display" ? (
            <Player mediaType={state.context.display.fileFormat} mediaURL={mediaURL} config={config.imgViewer} />
          ) : (
            <Header state={state} authenticate={() => send({ type: "SIGN" })} />
          )}
          <Panel state={state} />
          {config.debug && <p>{state.value}</p>}
        </div>
      </div>
      {/* <pre>{JSON.stringify(state.context, null, 2)}</pre> */}
    </div>
  )
}

stories.add("normal db", () => {
  const tokenId = "30553606573219150352991292921105176340809048341686170040023897674790759038977"
  const contractAddress = "0x495f947276749ce646f68ac8c248420045cb7b5e"
  const platform = "Ethereum"

  return widget({ tokenId, contractAddress, platform, stack: true })
})

stories.add("stack db", () => {
  const tokenId = "30553606573219150352991292921105176340809048341686170040023897679188805550081"
  const contractAddress = "0x495f947276749ce646f68ac8c248420045cb7b5e"
  const platform = "Ethereum"

  return widget({ tokenId, contractAddress, platform, stack: true })
})
