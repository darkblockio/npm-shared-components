//test in avalanche only!
export const config = {
  
    // exposeFrom: {
    name: {
      value: "creator",
      //content made by the creator, which is also default. Right now we just want them to be able to turn it back on if they want to.
      value: "ucg",
      //UGC
      value: "other",
      //OGC
    },
    //   address: ["<wallet address that uploaded the content>"],
    // },
  
}
//be able to choose b/w the three options. Make one API call and filter it in the NPM with the tabs.
//API is already on staging, and will be pushed to prod.
//staging.darkblock.io is pointing to dev1
//Request URL: https://dev1.darkblock.io/v1/darkblock/info?nft_id=0x34eef37d76c228ccb777ea3f2e3244dff381655a:1&nft_platform=Polygon
