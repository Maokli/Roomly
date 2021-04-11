using System;

namespace API.Extensions
{

    ///<summary>
    ///Extends to DateTime class.
    ///</summary>
    public static class DateTimeExtensions
    {

        ///<summary>
        ///A method to calculate the age of the user.
        ///Takes a DateTime object as a parameter.
        ///Returns years passed since that date.
        ///</summary>
        public static int CalculateAge(this DateTime dob) {
            
            //Gets the current day
            var today = DateTime.Today; 

            //Gets the passed years since the current year
            var age = today.Year - dob.Year; 

            //if the years are matching
            //but the days or time are not
            //then decrements the age by 1
            if(dob.Date > today.AddYears(-age)) age--;

            return age;
        }
    }
}