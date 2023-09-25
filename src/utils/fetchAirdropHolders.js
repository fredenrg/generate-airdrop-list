const axios = require("axios");
const { stringify } = require("csv-stringify");
const fs = require("fs");

async function fetchMultipleHolders() {
  const allHolders = [];
  let nextCursor = ''; // Start with an empty string as cursor

  while (true) {
    try {
      const url = `https://api.stellar.expert/explorer/public/asset/FRED-GCA73U2PZFWAXJSNVMEVPNPPJCZGETWPWZC6E4DJAIWP3ZW3BAGYZLV6/holders?order=asc&limit=200${nextCursor ? `&cursor=${nextCursor}` : ''}`;
      const fracOfHolders = await axios.get(url);

      if (fracOfHolders.data._embedded.records.length === 0) {
        console.log(allHolders.length, "FRED");
        break;
      }

      allHolders.push(...fracOfHolders.data._embedded.records);

      // Check if there is a next page
      if (!fracOfHolders.data._links.next) {
        break;
      }

      // Update the cursor with the paging_token of the last record
      nextCursor = allHolders[allHolders.length - 1].paging_token;
    } catch (error) {
      console.error("Error fetching holders", error);
      break;
    }
  }

  console.log("Total holders", allHolders.length);

  stringify(allHolders, { header: true }, function (err, output) {
    fs.writeFile(__dirname + "/airdrop-list.csv", output, (err, data) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log("List generated!");
      }
    });
  });

  return allHolders;
}

module.exports = {
  fetchMultipleHolders,
};
