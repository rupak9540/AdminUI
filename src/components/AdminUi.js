import { useState} from "react";
import { FaEdit } from 'react-icons/fa';
import { AiOutlineDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Pagination } from "antd";
import "../App.css";
import {Link} from 'react-router-dom';
// import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection";




function AdminUi(props) {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const {data,loading,error,setData} = props;
  
  const [searchUser, setSearchUser] = useState("");
  const [isChecked, setisChecked] = useState([]);
  const [update, setUpdate] = useState(false);
 
// const history = useNavigate();

  // Pagination Start
  const [pageCount, setPageCount] = useState(0);
  console.log("Page Count:", pageCount);

  const itemPerPage = 10;
  let pageVisited = pageCount * itemPerPage;

  const totalPages = Math.ceil(data.length / itemPerPage);
  const pageChange = ({ selected }) => {
    setPageCount(selected);
  };

  // useEffect(() => {

  //   fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `This is an HTTP error: The status is ${response.status}`
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then((actualData) => {
  //       setData(actualData);
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setData(null);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // console.log(data);
 




  // Delete User data onClick
  const deleteUser = (selectedUser) => {
    let userAfterDeletion = data.filter((user) => {
      return user.id !== selectedUser;
    });
    setData(userAfterDeletion);
  };

  // Edit Data by Click
  const editUserDetails = (id,name , email, role) => {
    // let newEditedItem = data.find((elem) => {
    //   return elem.id === id;
    // })

    // console.log(newEditedItem);
    localStorage.setItem('Name', name);

    localStorage.setItem('Email', email);
    localStorage.setItem('Role', role);
    localStorage.setItem('Id', id);

  };
  console.log("PageVisited: ", pageVisited);




  const handleChange = (e) => {

    const { value, checked } = e.target;
    console.log(value);

    if (checked) {
      setisChecked([...isChecked, value]);


    } else {
      setisChecked(isChecked.filter((e) => e !== value));

    }
  }
  const selectedDelete = () => {
    let arrayids = [...isChecked];
    let userAfterDeletion = data.filter((user) => {
      return (!arrayids.includes(user.id));
    });
    console.log(userAfterDeletion);
    setData(userAfterDeletion);

  }


  const selectAll = (e) => {
    const listedUserIds = data
      .filter((user) => user.show)
      
      .map((user) => user.id);

    let tempUsers = data.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setData(tempUsers);
    setUpdate(!update);
  };






  return (
    <div className="App container">

      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <form className="d-flex mt-5 mb-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search by name , email or role" aria-label="Search" onChange={(e) => setSearchUser(e.target.value)} checked={data} />

      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"><input className="form-check-input mt-0" type="checkbox" value={data.id}
              name="allSelect"
              // checked={
              //   data.filter((user) => user?.isChecked !== true).length <1
              // }
              checked={!data.some((user) => user?.isChecked !== true)}
              onChange = {(e)=>selectAll(e)}

              aria-label="Checkbox for following text input" /></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {data
            .filter((data) => {

              if (searchUser === "") return data;
              else if (
                data.name.includes(searchUser) ||
                data.email.includes(searchUser) ||
                data.role.includes(searchUser)
              ) {
                return data;
              }
            })
            .slice(pageVisited, pageVisited + itemPerPage)

            .map((user) => (
              <tr key={user.id}>
                <th scope="row" ><input className="form-check-input mt-0" type="checkbox" id={user.id} value={user.id} aria-label="Checkbox for following text input" name={user.id}
                  checked={user.isChecked}
                  onChange={(e) => handleChange(e)}

                /></th>
                <td >{user.name}</td>
                <td >{user.email}</td>
                <td >{user.role}</td>
                <td >
                  <span className="mx-2">{" "}<Link to='/edit' ><FaEdit className="fs-5 " onClick={() => editUserDetails(user.id,user.name,user.email,user.role)} /></Link>{" "}</span>
                  <span>{" "}<AiOutlineDelete className=" text-danger fs-4" onClick={() => deleteUser(user.id)} />{" "}</span>
                </td>



              </tr>

            ))}





        </tbody>
      </table>


      <div className=" d-flex mb-3 ">

        <button type="button" className="btn btn-danger " onClick={selectedDelete} >Delete Selected</button>

        {/* pagination */}


        <ReactPaginate
          className="pagination"
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={pageChange}
          containerClassName={<Pagination />}
        />
      </div>






    </div>
  );
}

export default AdminUi;
