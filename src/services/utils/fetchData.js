const fetchData = async (getData, setData) => {
    try {
      const response = await getData();
      const dataWithId = response.map((item, index) => ({
        id: index,
        name: item
      }));
      setData(dataWithId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


export default fetchData;