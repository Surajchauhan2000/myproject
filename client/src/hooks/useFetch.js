import {useState,useEffect} from 'react';
import axios from "axios";

const useFetch=(url)=>{
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    // first the loading is false and if the loading is complete then it become true adn load all the data
    // but if any error occure then error become true and send the error 

    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            try{
                const res=await axios.get(url);
                setData(res.data); 
            }catch(err){
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    },[url]);
    // we will be use this url to refetch document again and again by simply writing the min and max ammount in text box without clicking the search button

    const reFetch=async()=>{
        setLoading(true);
        try{
            const res=await axios.get(url);
            setData(res.Data);
        }catch(err){
            setError(err);
        }
        setLoading(false);
    };

    return {data,loading,error,reFetch}; 
};

export default useFetch;