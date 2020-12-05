import Swal from 'sweetalert2';

export async function Transaction(fn: void) {}
//   if(window.wallet){
//     const A = await window.surveyInstance.connect(window.wallet).populateTransaction.sendSurvey(SurveyHash, answer,{
//       value: ethers.utils.parseEther('1'),
//     });
//     console.log("call : ",A);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to undo this action!",
//       html: `<p>You will not be able to undo this action!</p>
//               <h1 style={{fontStyle:"bold"}}> Value : ${ethers.utils.formatEther(A.value)} </h1>
//               <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
//               <p> gasFee : ${A?.gasPrice || '0'} </p>`,
//       icon: "warning",
//       showCancelButton: true,
//       cancelButtonText: 'No, cancel!',
//       confirmButtonText: "Yes, do it!",
//       showLoaderOnConfirm: true,
//       preConfirm: () => {
//         return window.surveyInstance.connect(window.wallet).sendSurvey(SurveyHash, answer,{
//           value: ethers.utils.parseEther('1'),
//         }).then(res => {res.wait(); Swal.fire('Good job!', '"You have Submit your Survey', 'success')})
//         .catch(async ()=>{
//           const add = (window.wallet.address)?window.wallet.address:(await window.wallet.getAddress());
//           const x = new ethers.VoidSigner(add, window.providerESN);
//           try {
//             const A = await window.surveyInstance.connect(x).estimateGas.sendSurvey(SurveyHash, answer);
//             console.log(A);
//           } catch (e) {
//             console.log('Error is : ', e);
//             Swal.fire('Oops...!', `${e}`, 'error')
//           }
//         });
//       }

//     });

//   }else{
//     Swal.fire({
//       icon: 'error',
//       title: 'Please Connect to wallet ...',
//     });
//   }

// }
