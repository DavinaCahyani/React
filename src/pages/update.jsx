import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateDataForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nama, setNama] = useState('');
  const [nik, setNik] = useState('');
  const [gender, setGender] = useState('');
  const [jabatan, setJabatan] = useState('');

  useEffect(() => {
    // Fetch existing data for the specified ID
    axios.get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        const data = response.data;
        setNama(data.nama);
        setNik(data.nik);
        setGender(data.gender);
        setJabatan(data.jabatan);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    const update = {
      nama: nama,
      nik: nik,
      gender: gender,
      jabatan: jabatan,
    };
    
    try {
      await axios.put(`http://localhost:3000/users/${id}`, update);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data berhasil diperbarui',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate('/guru');
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Terjadi Kesalahan!',
        text: 'Mohon coba lagi',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" component="div" align="center" style={{ marginBottom: '16px' }}>
        Ubah Data Guru
      </Typography>
      <form onSubmit={updateUser}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="nama"
              label="Nama Guru"
              variant="outlined"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="nik"
              label="NIK"
              variant="outlined"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="gender"
              label="Gender"
              variant="outlined"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="jabatan"
              label="Jabatan"
              variant="outlined"
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              style={{ margin: '8px 0' }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Ubah
        </Button>
      </form>
    </Paper>
  );
}

export default UpdateDataForm;
