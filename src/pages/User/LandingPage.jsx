import background from '../../images/bg.jpg'
import doctorImg from '../../images/doctor.png'

const LandingPage = () => {
    return(
        <div className="px-8 pb-8 relative">
            <img src={background} alt="" />
            <div className="absolute w-full h-full top-0">
                <div className="grid grid-cols-2 h-full ">
                    <div className="flex mdp-5 flex-col justify-center items-center h-full">
                        <h2 className='capitalize xl:text-6xl text-center font-extrabold text-white'>Your Health is our <span className='block mt-5'> main priority</span> </h2>
                        <div className="flex justify-center mt-6">
            <a href="/userdoctor">
              <button className="bg-teal-300 px-6 py-3 rounded-md text-white font-medium hover:bg-teal-600">
                Appointment
              </button>
            </a>
          </div>
 

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