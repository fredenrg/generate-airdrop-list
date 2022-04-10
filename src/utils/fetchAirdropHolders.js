const fs = require("fs");
const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon.stellar.org");
const axios = require("axios");
const { stringify } = require("csv-stringify");

const fetchMultipleHolders = async () => {
  const allHolders = [];
  for (i = 1; i > -1; i++) {
    const fracOfHolders = await axios.get(
      `https://api.stellar.expert/explorer/public/asset/FRED-GCA73U2PZFWAXJSNVMEVPNPPJCZGETWPWZC6E4DJAIWP3ZW3BAGYZLV6/holders?order=asc&cursor=${
        i === 1 ? 0 : (i - 1) * 200
      }&limit=${i * 200}`
    );
    if (fracOfHolders.data._embedded.records.length === 0) {
      console.log(allHolders.length, "FRED");
      break;
    }
    allHolders.push(...fracOfHolders.data._embedded.records);
  }
  for (i = 1; i > -1; i++) {
    const fracOfHolders = await axios.get(
      `https://api.stellar.expert/explorer/public/asset/WHALE-GBPZTFUAQOIQ3LAIC6Q25SNGOE7TJ5SWJNMKN3ZU7HVQMONFXWAOQYWZ/holders?order=asc&cursor=${
        i === 1 ? 0 : (i - 1) * 200
      }&limit=${i * 200}`
    );
    if (fracOfHolders.data._embedded.records.length === 0) {
      console.log(allHolders.length, "FRED + WHALE");
      break;
    }
    allHolders.push(...fracOfHolders.data._embedded.records);
  }
  for (i = 1; i > -1; i++) {
    const fracOfHolders = await axios.get(
      `https://api.stellar.expert/explorer/public/asset/DODA-GBADNYBC3JYAA76GWTY4YVPVMEGZKAYPDM3DPURCIIWQHTLNGWFK73Z5/holders?order=asc&cursor=${
        i === 1 ? 0 : (i - 1) * 200
      }&limit=${i * 200}`
    );
    if (fracOfHolders.data._embedded.records.length === 0) {
      console.log(allHolders.length, "FRED + WHALE + DODA");
      break;
    }
    allHolders.push(...fracOfHolders.data._embedded.records);
  }
  for (i = 1; i > -1; i++) {
    const fracOfHolders = await axios.get(
      `https://api.stellar.expert/explorer/public/asset/UBEC-GDPNB7S3IOM2J6C3NA2QG4TQAUCRZXPJJ4HSCSIKELEH7ORUCX5UB2VN/holders?order=asc&cursor=${
        i === 1 ? 0 : (i - 1) * 200
      }&limit=${i * 200}`
    );
    if (fracOfHolders.data._embedded.records.length === 0) {
      console.log(allHolders.length, "FRED + WHALE + DODA + UBEC");
      break;
    }
    allHolders.push(...fracOfHolders.data._embedded.records);
  }
  console.log("Total holders", allHolders.length);
  stringify(
    allHolders,
    {
      header: true,
    },
    function (err, output) {
      fs.writeFile(__dirname + "/airdrop-list.csv", output, (err, data) => {
        console.log("List generated!");
      });
    }
  );
  return allHolders;
};

module.exports = {
  fetchMultipleHolders,
};
