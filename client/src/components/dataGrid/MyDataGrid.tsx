import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useGetAstrollogersQuery } from '../../features/api/apiSlice';
import BeatLoader from 'react-spinners/BeatLoader'
import { useNavigate } from 'react-router-dom';


interface Astrologer {
  _id: string;
  profileImageUrl: string;
  name: string;
  email: string;
  gender: string;
  Languages: string;
  Specialities: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyDataGrid = () => {
  const { data: astrollogers, isLoading} = useGetAstrollogersQuery(null);
  const navigate = useNavigate()
  const columns: GridColDef<Astrologer>[] = [
    {
      field: 'profileImageUrl',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.row.profileImageUrl}
          alt={params.row.name}
          style={{ width: '40%', height: '100%', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150,
      editable: true,
    },
    {
      field: 'languages',
      headerName: 'Languages',
      width: 150,
      editable: true,
    },
    {
      field: 'specialities',
      headerName: 'Specialities',
      width: 150,
      editable: true,
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" size="small" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
  ]

  const handleEdit = (row: Astrologer) => {
    console.log("🚀 ~ file: MyDataGrid.tsx:75 ~ handleEdit ~ row:", row)
    navigate(`edit-astrologer/${row._id}`)

  }
  return (
    <>
      {
        isLoading ? (
          <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <BeatLoader
                  color="#36d7b7"
                  loading
                  margin={0}
                  size={15}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
<Box sx={{ height: 400, width: '100%' }}>
        {
          astrollogers ? (
            <DataGrid
              rows={astrollogers.data}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            ""
          )
        }
      </Box>
          </>
        )
      }
      
    </>
  )
}

export default MyDataGrid