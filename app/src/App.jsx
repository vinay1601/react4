import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Searchresult from './components/SearchResults/Searchresult';

export const BASE_URL = "http://localhost:9000";

const App = () => {

const [data , setData] = useState(null);
const [loading , setLoading] = useState(false);
const [error , setError] = useState(false);
const [filterValue , setflitervalue] = useState(null);
const [selectedBtn , setSelectedBtn] = useState("all");


useEffect(() => {

  const fetchData = async() =>{
    setLoading(true);
  
    try {
      const response = await fetch(BASE_URL);
  
      const json = await response.json();
  
      setData(json);
      setflitervalue(json);
      setLoading(false);
  
      
    } catch (error) {
      setError("data is not fetch")
    }
  
  
  }
  
  fetchData();
}, [])

const searchFood = (e) => {
  const searchValue = e.target.value;

  // console.log(searchValue);
  
  if(searchValue === ""){
    setflitervalue(null);
  }

  const filter = data?.filter((food) => 
    food.name.toLowerCase().includes(searchValue.toLowerCase())
);
setflitervalue(filter);
};

const filterFood = (type) => {
  if (type === 'all') {
    setflitervalue(data);
    setSelectedBtn('all');
    return;
  }

  const ty = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase())
  );

  setflitervalue(ty);
  setSelectedBtn(type);
};

const filterBtns = [
  {
    name: "all",
    type: "all",
  },
  {
    name: "breakfast",
    type: "breakfast",
  },
  {
    name: "lunch",
    type: "lunch",
  },
  {
    name: "dinner",
    type: "dinner",
  }
];

if (error) return <div>{error}</div>
if (loading) return <div>Loading.....................</div>

  return <>
  <Container>
  
    <TopContainer>
      <div className='logo'>
        <img src="images/log1.png" alt="logo" /> 
      </div>

      <div className='search'>
        <input onChange={searchFood} type="text" placeholder='Search Food' />
      </div>
    </TopContainer>

    <FilterContainer >
{
  filterBtns.map((value) => (
    <Button isSelected = {selectedBtn === value.type} key={value.name} onClick={() => filterFood(value.type)}>{
      value.name
    }</Button>
  ))}


     

    </FilterContainer>

<Searchresult data={filterValue} />

  </Container>
  </>
};

export default App;

const Container = styled.div`
/*  */
`;
const TopContainer = styled.section`
  /* border: 2px solid rebeccapurple; */
  display: flex;
  max-width: 1200px;
  height: 140px;
  justify-content: space-between;
  padding:20px;
  margin: 0 auto;
  align-items: center;
  .logo{
  }

  .search{
    input{
      background-color: transparent;
      border: 2px solid red;
      color: #fff;
      height: 40px;
      font-size: 16px;
      border-radius: 5px;
      padding: 0 10px;
    }
  }

  @media (0 < width < 600px){
    flex-direction: column;
    height: 120px; 
  } 

`


const FilterContainer = styled.section`

display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;
`;

export const  Button = styled.button`
background: ${({isSelected}) => (isSelected ? "#db1010" : "#ff4343")};
outline: 1px solid ${({isSelected}) => (isSelected ? "white" : "#ff4343")};
border-radius: 5px;
padding: 6px 12px;
color: white;
border: none;
cursor: pointer;
&:hover{
  background: #db1010;
}

`;



