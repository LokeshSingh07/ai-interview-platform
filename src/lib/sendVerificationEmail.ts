import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { platformName, resendMailId } from "@/data/constant";
// import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    firstName: string,
    verifyCode: string
): Promise<any>{

    try{
        const { data, error } = await resend.emails.send({
            from: `${resendMailId}`,
            to: email,
            subject: `${platformName} | Verification code`,
            react: VerificationEmail({firstName, verifyCode}),
        });

        // console.log("resend error: ", error);
        if (error) {
            return {
                success: false,
                message: "Failed to send verification email"
            }
        }

        return {
            success: true,
            message: "Verification mail sent successfully"
        }
    }
    catch(emailError){
        console.error("Error sending verification Email", emailError);
        return {
            success: false,
            message: "Internal server error, Resend"
        }
    }
}