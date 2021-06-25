// import React, { useState, useContext } from 'react';
// const axios = require('axios');

// function CreateQuotation() {
//   const [productName, setProductName] = useState('');
//   const [categoryId, setCategoryId] = useState('');
//   const [quantity, setQuantity] = useState(null);
//   const [unit, setUnit] = useState('');
//   const [wishPrice, setWishPrice] = useState(null);
//   const [description, setDescription] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const handleRequestQuotation = () => {
//     if (!productName || !categoryId || !description || !startDate || !endDate) {
//       return;
//       //thong bao thieu thong tin
//     }
//     let userId = localStorage.getItem('UserId');
//     let loginToken = localStorage.getItem('LoginToken');
//     const quotationForm = new FormData();
//     quotationForm.append('userId', userId);
//     quotationForm.append('categoryId', categoryId);
//     quotationForm.append('productName', productName);
//     quotationForm.append('quantity', quantity);
//     quotationForm.append('unit', unit);
//     quotationForm.append('wishPrice', wishPrice);
//     quotationForm.append('description', description);
//     quotationForm.append('startDate', startDate);
//     quotationForm.append('endDate', endDate);
//     axios.post('http://localhost:5000/api/quotationrequests', quotationForm, {
//       headers: {
//         Authorization: 'Bearer ' + loginToken,
//       },
//     }).then(res => {
//       //thanh cong
//     }).catch(err => {
//       //that bai
//     })
//   }

//   return (

//   );
// };

// export default CreateQuotation;