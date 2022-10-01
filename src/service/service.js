

const getUsers = (setData,setLoading,setError)=>{
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setData(null);
    })
    .finally(() => {
      setLoading(false);
    });
}

export {getUsers};