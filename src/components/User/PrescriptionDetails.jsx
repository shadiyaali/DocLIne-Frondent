import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import jsPDF from 'jspdf';

function PrescriptionDetails({ prescription, setShowPrescription }) {
  const handleDownload = () => {
    const pdf = new jsPDF();
    pdf.text(`Doctor Name: ${prescription?.doctor?.user?.first_name}`, 10, 10);
    pdf.text(`Patient Name: ${prescription?.patient?.first_name}`, 10, 20);
    pdf.text(`Medication: ${prescription?.medication}`, 10, 30);
    pdf.text(`Dosage: ${prescription?.dosage}`, 10, 40);
    pdf.text(`Instructions: ${prescription?.instructions}`, 10, 50);
    
    const filename = 'prescription.pdf';
    pdf.save(filename);
  };

  return (
    <div className="w-2/5 bg-gray-200 p-8 rounded-lg">
      <AiOutlineCloseCircle onClick={() => setShowPrescription(false)} className="text-black w-5 h-5 ml-auto" />
      <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
      <div className="mb-4">
        <label className="text-lg font-medium">Doctor Name:</label>
        <p>{prescription?.doctor?.user?.first_name}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Patient Name:</label>
        <p>{prescription?.patient?.first_name}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Medication:</label>
        <p>{prescription?.medication}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium">Dosage:</label>
        <p>{prescription?.dosage}</p>
      </div>
      <div className="mb-4">
        <label className="text-lg font-medium h-full">Instructions:</label>
        <h6>{prescription?.instructions}</h6>
      </div>
      <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-primary-dark font-sans" onClick={handleDownload}>
        Download Prescription
      </button>
    </div>
  );
}

export default PrescriptionDetails;
