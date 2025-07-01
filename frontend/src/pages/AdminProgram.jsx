import React, {useState, useEffect} from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from "../components/AdminLayout";

const AdminProgram = ()=> {

    const [program , setProgram] = useState('');
    const [tableData , setTableData] = useState(null)
    const [editId, setEditId] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response= isEdit? await axios.put(`http://localhost:5000/api/admin/program/${editId}`,{program}):
          await axios.post('http://localhost:5000/api/admin/program/', {program} )

           if(response.data.msg == 'Success')
           {
            toast.success(isEdit ? "Program updated" : "Program added");
               setProgram("");
               setEditId("");
               setIsEdit(false)
               fetchProgram();
           }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't save program");
            console.error(error);
        }
    }

       const fetchProgram = async()=>{
         try {
             const res= await axios.get('http://localhost:5000/api/admin/program/')
             if(res.data.msg=='Success')
             setTableData(res.data.value)
            else
            toast.error(res.data.msg || "Failed to fetch programs");
         } catch (error) {
             toast.error("Failed to fetch programs");
             console.error(error);
         }
       }

       const editProgram = async(e)=>{
          setProgram(e.program);
          setEditId(e._id);
          setIsEdit(true)
        }
       

       const deleteProgram = async(id)=>{
        if (window.confirm("Are you sure you want to delete this program?")) {
            try {
                const  res = await axios.delete(`http://localhost:5000/api/admin/program/${id}`)
                if(res.data.msg=='Success')
                {
                    toast.success("Program deleted successfully");
                    fetchProgram();
                }
                else
                toast.error(res.data.msg || "Failed to delete program");
            } catch (error) {
                toast.error(error.response?.data?.msg || "Couldn't delete program");
                console.error(error);
            }
        }
          }


       useEffect(()=>{ fetchProgram();},[])


return(
<AdminLayout>
    <h3 className="mb-4 text-primary-nou">Program Management</h3>
    <div className="row">
        <div className="col-md-5">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">{isEdit ? "Edit Program" : "Add Program"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="programInput" className="form-label">Program Name</label>
                        <input
                            type="text"
                            id="programInput"
                            value={program}
                            className="form-control"
                            onChange={(e) => { setProgram(e.target.value) }}
                            placeholder="e.g., MCA"
                        />
                    </div>
                    <button type="submit" className="hero-btn">
                        {isEdit ? "Update Program" : "Add Program"}
                    </button>
                </form>
            </div>
        </div>
        <div className="col-md-7">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">View Programs</h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Program</th>
                                <th>Created At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((e, i) => (
                                <tr key={e._id}>
                                    <td>{i + 1}</td>
                                    <td>{e.program}</td>
                                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => { editProgram(e) }}>
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => { deleteProgram(e._id) }}>
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

export default AdminProgram;