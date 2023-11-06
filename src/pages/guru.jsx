import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Grid, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const customStyle = {
  fontSize: '18px', // Ubah ukuran teks
  fontWeight: 'bold', // Teks menjadi tebal
};

const rowStyle = {
  marginBottom: '10px',
};

const buttonStyle = {
  marginRight: '8px', // Tambah margin ke kanan tombol
};

export default function BasicTable() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUserAll = async () => {
      await axios
        .get("http://localhost:3000/users")
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserAll();
  }, []);

  const Delete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send a DELETE request to remove data from the API
          await axios.delete(`http://localhost:3000/users/${id}`);

          Swal.fire({
            title: "Terhapus!",
            text: "Data Anda telah dihapus.",
            icon: "success",
          });

          // Reload the data after successful deletion
          const updatedData = user.filter((item) => item.id !== id);
          setUser(updatedData);
        } catch (error) {
          console.error(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Terjadi Kesalahan!",
            text: "Mohon coba lagi",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const navigate = useNavigate();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Link to="/tambah">
          <Button variant="outlined" style={{ backgroundColor: 'blue', color: 'white' }}>
            Tambah
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={customStyle}>NO</TableCell>
                <TableCell style={customStyle}>NAMA</TableCell>
                <TableCell style={customStyle}>NIK</TableCell>
                <TableCell style={customStyle}>GENDER</TableCell>
                <TableCell style={customStyle}>JABATAN</TableCell>
                <TableCell style={customStyle}>AKSI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((users, i) => (
                <TableRow style={rowStyle} key={i}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{users.nama}</TableCell>
                  <TableCell>{users.nik}</TableCell>
                  <TableCell>{users.gender}</TableCell>
                  <TableCell>{users.jabatan}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      style={{ backgroundColor: 'green', color: 'white', ...buttonStyle }}
                      onClick={() => navigate(`/update/${users.id}`)}
                    >
                      Ubah
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'red', color: 'white' }}
                      onClick={() => Delete(users.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
