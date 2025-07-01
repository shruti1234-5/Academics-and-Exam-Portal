import React, {useState, useEffect} from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLayout from "../components/AdminLayout";

const AdminNews = ()=> {

    const [newsTitle , setNewsTitle] = useState('');
    const [description , setDescription] = useState('');
    const [tableData , setTableData] = useState(null)
    const [editId, setEditId] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const news = {newsTitle, description}
            const response = isEdit
            ? await axios.put(`http://localhost:5000/api/admin/news/${editId}`, { newsTitle, description })
            : await axios.post('http://localhost:5000/api/admin/news/', { newsTitle, description });
          
           if(response.data.msg == 'Success')
           {
            toast.success(isEdit ? "News updated successfully" : "News added successfully");
               setNewsTitle("");
               setDescription("");
               setEditId("");
               setIsEdit(false)
               fetchNews();
           }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Couldn't save news");
            console.error(error);
        }
    }

       const fetchNews = async()=>{
         try {
             const res= await axios.get('http://localhost:5000/api/admin/news/')
             if(res.data.msg=='Success')
             setTableData(res.data.value)
            else
            toast.error(res.data.msg || "Failed to fetch news");
         } catch (error) {
             toast.error("Failed to fetch news");
             console.error(error);
         }
       }

       const editNews = async(e)=>{
          setNewsTitle(e.newsTitle);
          setDescription(e.description);
          setEditId(e._id);
          setIsEdit(true)
        }
       

       const deleteNews = async(id)=>{
        if (window.confirm("Are you sure you want to delete this news item?")) {
            try {
                const  res = await axios.delete(`http://localhost:5000/api/admin/news/${id}`)
                if(res.data.msg=='Success')
                {
                    toast.success("News deleted successfully");
                    fetchNews();
                }
                else
                toast.error(res.data.msg || "Failed to delete news");
            } catch (error) {
                toast.error(error.response?.data?.msg || "Couldn't delete news");
                console.error(error);
            }
        }
          }


       useEffect(()=>{ fetchNews();},[])


return(
<AdminLayout>
    <h3 className="mb-4 text-primary-nou">News Management</h3>
    <div className="row">
        <div className="col-md-5">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">{isEdit ? "Edit News" : "Add News"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newsTitle" className="form-label">News Title</label>
                        <input type="text" id="newsTitle" value={newsTitle} className="form-control" onChange={(e)=>{setNewsTitle(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" value={description} className="form-control" rows="4" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                    </div>
                    <button type="submit" className="hero-btn">
                        {isEdit ? "Update News" : "Add News"}
                    </button>
                </form>
            </div>
        </div>
        <div className="col-md-7">
            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-secondary-nou">View News</h5>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created At</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.map((e,i)=>(
                                <tr key={e._id}>
                                    <td>{i+1}</td>
                                    <td>{e.newsTitle}</td>
                                    <td style={{ minWidth: '200px', whiteSpace: 'pre-wrap' }}>{e.description}</td>
                                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-sm btn-outline-warning" onClick={()=>{editNews(e)}}>
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={()=>{deleteNews(e._id)}}>
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

export default AdminNews;