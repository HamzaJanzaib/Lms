import React, { useState } from "react"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useRegisterMutation, useLoginMutation } from "@/Features/Api/Auth.Api";
import { Loader2 } from "lucide-react";
import { toast, Toaster } from 'sonner';

const Login = () => {
    const [registerForm, setRegisterForm] = useState({})
    const [loginForm, setLoginForm] = useState({})

    const [registerMutation, { isLoading: registerLoading, isSuccess: registerSuccess }] = useRegisterMutation();
    const [loginMutation, { isLoading: loginLoading, isSuccess: loginSuccess }] = useLoginMutation();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        const formType = name.startsWith("Register") ? "Register" : "Login";
        const fieldName = name.replace(formType, "").toLowerCase();

        if (formType === "Register") {
            setRegisterForm((prev) => ({ ...prev, [fieldName]: value }))
        } else {
            setLoginForm((prev) => ({ ...prev, [fieldName]: value }))
        }
    }

    const validateInput = (type, inputData) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (type === "Register") {
            if (!emailRegex.test(inputData.email)) {
                toast.error("Invalid email format");
                return false;
            }
            if (inputData.name.length < 3) {
                toast.error("Name must be at least 3 characters long");
                return false;
            }
        }
        if (inputData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        return true;
    }

    const handleOnSubmit = async (type) => {
        try {
            const inputData = type === "Register" ? registerForm : loginForm;
            if (!validateInput(type, inputData)) return;
            const action = type === "Register" ? registerMutation : loginMutation;

            const response = await action(inputData).unwrap();
            if (response.status === 400) {
                throw new Error(response.data.error || 'Bad Request');
            }
            if (registerSuccess || loginSuccess) {
                toast.success('Successfully logged in');
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Toaster />
                <Tabs defaultValue="Register" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Register">Register</TabsTrigger>
                        <TabsTrigger value="login">Login</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Register">
                        <Card>
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Create a new account here. Fill in your details and click register when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="Registername" placeholder="Enter Your Name" type="text" required onChange={handleOnChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="Registeremail" placeholder="Enter Your Email" type="email" required onChange={handleOnChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="Registerpassword" placeholder="Enter Your Password" type="password" required onChange={handleOnChange} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" onClick={() => handleOnSubmit("Register")}>{registerLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Register"}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Login to your account here. Enter your credentials to access your account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="Loginemail" placeholder="Enter Your Email" type="email" required onChange={handleOnChange} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" name="Loginpassword" placeholder="Enter Your Password" type="password" required onChange={handleOnChange} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" onClick={() => handleOnSubmit("login")}>{loginLoading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Login"}</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default Login
