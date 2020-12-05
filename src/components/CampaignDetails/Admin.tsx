import { ethers } from 'ethers';
import React from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2';

export default function Admin(props : {Hash :string}) {
  const {Hash} = props;

  const Approve = async () => {
    if (window.wallet) {
      const A = await window.charityInstance
        .connect(window.wallet)
        .populateTransaction.approveProposal(Hash);
      console.log('call : ', A);
      Swal.fire({
        title: 'Are you sure?',
        html: `<p>You want to Approve Campaogn of ${Hash} </p>
                <h1 style={{fontStyle:"bold"}}> Value : ${
                  A.value ? ethers.utils.formatEther(A?.value) : '0'
                } </h1>
                <small> To : ${A.to} </small><br/><small> From : ${A.from} ES </small>
                <p> gasFee : ${A?.gasPrice || '0'} </p>`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No, cancel!',
        confirmButtonText: 'Yes, do it!',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.charityInstance
            .connect(window.wallet)
            .approveProposal(Hash)
            .then(async () => {
              Swal.fire({
                title: 'Good job!',
                icon: 'success',
                text: 'You have post your comment ',
              });
            })
            .catch(async () => {
              const add = window.wallet.address
                ? window.wallet.address
                : await window.wallet.getAddress();
              const x = new ethers.VoidSigner(add, window.provider);
              try {
                const A = await window.charityInstance.connect(x).estimateGas.approveProposal(Hash);;
                console.log(A);
              } catch (e) {
                console.log('Error is : ', e);
                Swal.fire('Oops...!', `${e}`, 'error');
              }
            });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Please Connect to wallet to support ',
      });
    }
  };

  return (
    <div>
      <h3>Admin Panel</h3>
      <Button
        onClick={Approve}
        className="get-started-btn scrollto dontate-btn text-center btn-lg btn-yellow btn-block"
      >
        Approve Campaign
      </Button>
      <Button
        onClick={Approve}
        style={{background : "red"}}
        className="get-started-btn scrollto dontate-btn text-center btn-lg btn-yellow btn-block"
      >
        Donate From Pool
      </Button>
    </div>
  )
}
