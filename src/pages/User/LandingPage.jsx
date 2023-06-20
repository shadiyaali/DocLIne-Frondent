import background from '../../images/bg.jpg'
import doctorImg from '../../images/doctor.png'

const LandingPage = () => {
    return(
        <div className="px-8 pb-8 relative">
            <img src={background} alt="" />
            <div className="absolute w-full h-full top-0">
                <div className="grid grid-cols-2 h-full">
                    <div className="flex mdp-5 flex-col justify-center items-center h-full">
                        <h2 className='capitalize xl:text-6xl text-center font-extrabold text-white'>Your Health is our <span className='block mt-5'> main priority</span> </h2>
                        <a href="/userdoctor" className='px-5 py-2 bg-white font-bold rounded-md hover:shadow-lg mt-5'> Appointment
                         </a>
 

                    </div>
                    <div className="flex justify-center items-end pb-8">
                        <img src={doctorImg} alt="" className='max-w-[600px]'/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LandingPage;