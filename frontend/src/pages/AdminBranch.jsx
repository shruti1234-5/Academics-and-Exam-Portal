import React, {useState, useEffect} from "react";
import axios from 'axios'
import toast from 'react-hot-toast';
import AdminLayout from "../components/AdminLayout";

const Adminbranch = ()=> {

    const [branch , setBranch] = useState('');
    const [tableData , setTableData] = useState(null)
    const [editId, setEditId] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response= isEdit? await axios.put(`http://localhost:5000/api/admin/branch/${editId}`,{branch}):
          await axios.post('http://localhost:5000/api/admin/branch/', {branch} )

           if(response.data.msg == 'Success')
           {
            toast.success(isEdit ? "Branch updated successfully" : "Branch added successfully");
               setBranch("");
               setEditId("");
               setIsEdit(false)
               fetchbranch();
           }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't save branch");
            console.error(error);
        }
    }

       const fetchbranch = async()=>{
         try {
             const res= await axios.get('http://localhost:5000/api/admin/branch/')
             if(res.data.msg=='Success')
             setTableData(res.data.value)
            else
            toast.error(res.data.msg || "Failed to fetch branches");
         } catch (error) {
             toast.error("Failed to fetch branches");
             console.error(error);
         }
       }

       const editbranch = async(e)=>{
          setBranch(e.branch);
          setEditId(e._id);
          setIsEdit(true)
        }
       

       const deletebranch = async(id)=>{
        if (window.confirm("Are you sure you want to delete this branch?")) {
            try {
                const  res = await axios.delete(`http://localhost:5000/api/admin/branch/${id}`)
                if(res.data.msg=='Success')
                {
                    toast.success("Branch deleted successfully");
                    fetchbranch();
                }
                else
                toast.error(res.data.msg || "Failed to delete branch");
            } catch (error) {
                toast.error(error.response?.data?.msg || "Couldn't delete branch");
                console.error(error);
            }
        }
    }


       useEffect(()=>{ fetchbranch();},[])


return(
<AdminLayout>
    <h3 className="mb-4 text-primary-nou">Branch Management</h3>
    <div className="row">
        <div className="col-md-5">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">{isEdit ? "Edit Branch" : "Add Branch"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="branchInput" className="form-label">Branch Name</label>
                        <input
                            type="text"
                            id="branchInput"
                            value={branch}
                            className="form-control"
                            onChange={(e) => { setBranch(e.target.value) }}
                            placeholder="e.g., Computer Science"
                        />
                    </div>
                    <button type="submit" className="hero-btn">
                        {isEdit ? "Update Branch" : "Add Branch"}
                    </button>
                </form>
            </div>
        </div>
        <div className="col-md-7">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">View Branches</h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Branch</th>
                                <th>Created At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((e, i) => (
                                <tr key={e._id}>
                                    <td>{i + 1}</td>
                                    <td>{e.branch}</td>
                                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => { editbranch(e) }}>
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => { deletebranch(e._id) }}>
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</AdminLayout>
)
}

export default Adminbranch;