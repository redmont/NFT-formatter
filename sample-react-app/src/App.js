import React, {useEffect, useState} from "react";
import "./App.css";

import {FetchNFTClient} from "./dist";

// Open Sea Config
const openSeaConfig = {
    /*apiEndpoint: "...",
    apiKey: "...",
    assetLimit: 50,
    eventLimit: 300,*/
};

// Solana Config
const solanaConfig = {
    /*rpcEndpoint: "...",*/
};

// Initialize fetch client
const fetchClient = new FetchNFTClient({openSeaConfig, solanaConfig});

const App = () => {
    const [collectibles, setCollectibles] = useState(null);
    const [ethCollection, setEthCollection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetching all collectibles for the given wallets
    }, []);
    const fetchCollection = (eth, sol) => {
        setLoading(true);
        setEthCollection(eth);
        fetchClient
            .getCollectibles({
                ethWallets: [eth],
            })
            .then((res) => {
                setCollectibles(res);
                setLoading(false);
            });
    };

    return (
        <div className="App">
            <div className="Header">Eth Collectibles</div>
            <form
                onSubmit={(e) => {
                    console.log(e);
                    e.preventDefault();
                    fetchCollection(e.target[0]?.value);
                }}
            >
                <input
                    name="Collection"
                    style={{width: 400, marginRight: 10, marginTop: 10}}
                ></input>
                <br></br>
                <br></br>
                <button type="submit">Render NFTs</button>
                {" or "}
                <button type="submit">Print formatted NFTs info</button>
            </form>
            <br></br>
            <br></br>
            {loading && "Loading..."}
            {collectibles?.ethCollectibles[ethCollection]?.map((collectible) => (
                <div className="Collectibles">
                    <div className="Name">{collectible.name}</div>
                    <img
                        className="Image"
                        src={collectible.frameUrl || collectible.gifUrl}
                        alt={collectible.name}
                    />
                    <br></br>
                    <br></br>
                </div>
            ))}
        </div>
    );
};

export default App;
