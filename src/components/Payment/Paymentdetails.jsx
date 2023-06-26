import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PaymentPage from "./Payment";
import { BASE_URL } from "../../utils/config";
import { format } from 'date-fns';

export default function Paymentdetails(props) {
  const { doctor, bookedSlot } = props;
  const start_time = format(new Date(`2000-01-01T${bookedSlot.start_time}`), 'h:mm a');
  const end_time = format(new Date(`2000-01-01T${bookedSlot.end_time}`), 'h:mm a');

  return (
    <Card className="w-80 md:w-96 flex flex-col shadow-2xl mb-28">
      <CardHeader className="h-64">
        <img
          alt="Card Image"
          src={`${BASE_URL + doctor?.user?.image}`}
          className="h-full w-full object-cover rounded-t-md"
        />
      </CardHeader>
      <CardBody className="flex flex-col items-center p-4">
        <Typography variant="h4" color="blue-gray" className="mb-2 text-2xl font-bold">
          Dr. {doctor?.user?.first_name}
        </Typography>
        <Typography color="gray" className="text-blue-600 font-bold text-lg" textGradient>
          {doctor?.department.name}
        </Typography>
      </CardBody>
      <CardFooter className="flex flex-col items-center py-4">
        <div className="mb-6">
          <Typography variant="subtitle1 " color="gray" className="font-medium text-lg">
            Booking Fee
          </Typography>
          <Typography variant="h5" color="indigo-600" className="font-bold mt-1 text-2xl">
            &#x20B9; {doctor.fee}
          </Typography>
        </div>
        <div className="mb-6">
          <Typography variant="subtitle1" color="gray" className="font-medium text-lg text-center">
            Booking Time
          </Typography>
          <Typography variant="h5" color="indigo-600" className="font-bold mt-1 text-2xl">
            {start_time} - {end_time}
          </Typography>
        </div>
        <div className="w-full flex items-center justify-center">
          <PaymentPage doctor={doctor} bookedSlot={bookedSlot} />
        </div>
      </CardFooter>
    </Card>
  );
}
