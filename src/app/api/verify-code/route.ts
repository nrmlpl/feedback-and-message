import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

const VerifyCodeQuerySchema = z.object({
    username: userNameValidation,
    code: z.string().length(6)
})

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get('username'),
            code: searchParams.get('code')
        };

        const result = VerifyCodeQuerySchema.safeParse(queryParams);

        if (!result.success) {
            const resultErrors = result.error.format();
            const allErrors = [
                ...(resultErrors.username?._errors || []),
                ...(resultErrors.code?._errors || [])
            ];
            return Response.json(
                {
                    success: false,
                    message: allErrors?.length > 0
                        ? allErrors.join(', ')
                        : 'Invalid query parameters'
                },
                { status: 400 }
            );
        }

        const { username, code } = result.data;
        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true;
            await user.save();

            return Response.json({
                success: true,
                message: "User verified successfully"
            }, { status: 200 })
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code expired, please signup again."
            }, { status: 400 })
        } else {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            }, { status: 400 })
        }


    } catch (error) {
        console.error("Error verifying user", error);
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, { status: 500 })
    }
}