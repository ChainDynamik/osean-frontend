import { useContract, useNFTs } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import  Link  from "next/link";
import { useRouter } from 'next/router';

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract,{
    count: 2222,
    start: 0,
  });

  // Filtering criteria
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]); // Initialize with an empty array
  const [showDirectListings, setShowDirectListings] = useState(false); // Initialize with false

  // Toggle filter criteria when the button is clicked
  const handleFilterClick = (filterValue: string) => {
    // Toggle the filter criteria
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filterValue)
        ? prevFilters.filter((value) => value !== filterValue)
        : [...prevFilters, filterValue]
    );
  };

  console.log(data);

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle option change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    // Depending on the selected option, you can navigate to the corresponding page
    switch (event.target.value) {
      case 'governance':
        router.push('/buygov');
        break;
      case 'skippers':
        router.push('/buy');
        break;
      default:
        break;
    }
  };
  
  return (
    <Container maxWidth="lg">
      <br />
      <br />
      <div className="breadcrumb">
      <div>
        <Link href="/markt">Marketplace &nbsp;</Link> /&nbsp;
        <Link href="/buy">Buy NFTs &nbsp;</Link> /&nbsp;
        <Link href="/sell">Sell NFTs</Link>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {/* Dropdown Selector */}
        <select value={selectedOption} onChange={handleOptionChange} style={{height:"30px", color: "#1E90FF"}}>
          <option value="">Choose from OSEAN collections</option>
          <option value="governance">Governance NFT Collection</option>
          <option value="skippers">OSEAN Skippers Collection</option>
        </select>
      </div>
    </div>
    <div className="mb-5">
      <h1>Buy OSEAN Skippers NFTs</h1>
      <p>Browse which NFTs are available from the collection. Select available toggle buttons to filter based on NFT traits.</p>
      <p><button
            onClick={() => setShowDirectListings(!showDirectListings)} // Toggle showDirectListings state
            className="btn btn-sm btn-round btn-sign-in my-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-orange"
          >
            {showDirectListings ? "Show All NFTs" : "Show Only NFTs for Sale"}
          </button></p>
      {/* Update button text based on filter state */}
      <button 
        className="btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue" 
        onClick={() => handleFilterClick("Male")}
      >
      {selectedFilters.includes("Male") ? "Male [X]" : "Male"}
      </button>
      <button
        onClick={() => handleFilterClick("Female")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Female") ? "Female [X]" : "Female"}
      </button>
      <button 
        className="btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue" 
        onClick={() => handleFilterClick("Old")}
      >
      {selectedFilters.includes("Old") ? "Old [X]" : "Old"}
      </button>
      <button
        onClick={() => handleFilterClick("Young")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Young") ? "Young [X]" : "Young"}
      </button>
      <button
        onClick={() => handleFilterClick("Angry")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Angry") ? "Angry [X]" : "Angry"}
      </button>
      <button
        onClick={() => handleFilterClick("Jolly")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Jolly") ? "Jolly [X]" : "Jolly"}
      </button>
      <button
        onClick={() => handleFilterClick("Serious")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Serious") ? "Serious [X]" : "Serious"}
      </button>
      <button
        onClick={() => handleFilterClick("Calm")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Calm") ? "Calm [X]" : "Calm"}
      </button>
      <button
        onClick={() => handleFilterClick("Sunglasses")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Sunglasses") ? "Sunglasses [X]" : "Sunglasses"}
      </button>
      <button
        onClick={() => handleFilterClick("Hat")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Hat") ? "Hat [X]" : "Hat"}
      </button>
      <button
        onClick={() => handleFilterClick("Smoking")}
        className= "btn btn-sm btn-round btn-sign-in my-2 mr-2 my-sm-2 mr-sm-2 fadeInDown animated btn-gradient-blue"
      >
      {selectedFilters.includes("Smoking") ? "Smoking [X]" : "Smoking"}
      </button>
      <br />
      <br />
      <NFTGrid
        data={data}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection that either don't match your criteria, or you have selected conflicted criteria (a prortrait cannot be Young and Old at the same time)."
        }
        filterCriteria={selectedFilters}
        showDirectListings={showDirectListings} // Pass the showDirectListings prop
       
      />
      </div> 
    </Container>
  );
}