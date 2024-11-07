import { useState, useEffect } from "react";
import RegCard from "./_components/RegCard";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  isArchived: boolean;
}

const RegPaymentPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/dues');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load membership options. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.includes("Registration") || product.name.includes("Register")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-10 mt-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-primary text-white p-6">
            <CardTitle className="text-2xl font-bold">
              Membership Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">
              Welcome to the Ndiigbo Sunderland Membership Registration page.
              Here you can find various membership options to join our vibrant
              community. Please select the appropriate registration product to
              proceed and become a part of our growing family.
            </p>
            <UnderlinedText className="text-lg font-semibold text-primary mb-8">
              Join us today and enjoy exclusive benefits!
            </UnderlinedText>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : error ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                role="alert"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{error}</p>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RegCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No registration options available at the moment.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegPaymentPage;


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { CreditCard, User, Mail, Phone, AlertCircle } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// export default function RegistrationPayment() {
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     paymentMethod: "",
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     agreeTerms: false,
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       paymentMethod: value,
//     }));
//     if (errors.paymentMethod) {
//       setErrors((prevErrors) => ({ ...prevErrors, paymentMethod: "" }));
//     }
//   };

//   const handleCheckboxChange = (checked: boolean) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       agreeTerms: checked,
//     }));
//     if (errors.agreeTerms) {
//       setErrors((prevErrors) => ({ ...prevErrors, agreeTerms: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Email is invalid";
//     if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//     if (!formData.paymentMethod)
//       newErrors.paymentMethod = "Payment method is required";
//     if (
//       formData.paymentMethod === "credit" ||
//       formData.paymentMethod === "debit"
//     ) {
//       if (!formData.cardNumber.trim())
//         newErrors.cardNumber = "Card number is required";
//       if (!formData.expiryDate.trim())
//         newErrors.expiryDate = "Expiry date is required";
//       if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
//     }
//     if (!formData.agreeTerms)
//       newErrors.agreeTerms = "You must agree to the terms and conditions";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       toast({
//         title: "Registration Successful",
//         description:
//           "Your payment has been processed and your registration is complete.",
//       });
//       // Reset form or redirect user
//     } catch (error) {
//       toast({
//         title: "Registration Failed",
//         description:
//           "There was an error processing your payment. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl">Registration Fee Payment</CardTitle>
//           <CardDescription>
//             Please fill in your details and complete the payment to register.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     placeholder="John Doe"
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className={`pl-8 ${
//                       errors.fullName ? "border-red-500" : ""
//                     }`}
//                     aria-invalid={errors.fullName ? "true" : "false"}
//                     aria-describedby={
//                       errors.fullName ? "fullName-error" : undefined
//                     }
//                   />
//                 </div>
//                 {errors.fullName && (
//                   <p id="fullName-error" className="text-sm text-red-500">
//                     {errors.fullName}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={`pl-8 ${errors.email ? "border-red-500" : ""}`}
//                     aria-invalid={errors.email ? "true" : "false"}
//                     aria-describedby={errors.email ? "email-error" : undefined}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p id="email-error" className="text-sm text-red-500">
//                     {errors.email}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     placeholder="(123) 456-7890"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={`pl-8 ${errors.phone ? "border-red-500" : ""}`}
//                     aria-invalid={errors.phone ? "true" : "false"}
//                     aria-describedby={errors.phone ? "phone-error" : undefined}
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p id="phone-error" className="text-sm text-red-500">
//                     {errors.phone}
//                   </p>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="paymentMethod">Payment Method</Label>
//                 <Select
//                   onValueChange={handleSelectChange}
//                   value={formData.paymentMethod}
//                 >
//                   <SelectTrigger
//                     className={errors.paymentMethod ? "border-red-500" : ""}
//                   >
//                     <SelectValue placeholder="Select payment method" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="credit">Credit Card</SelectItem>
//                     <SelectItem value="debit">Debit Card</SelectItem>
//                     <SelectItem value="paypal">PayPal</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.paymentMethod && (
//                   <p className="text-sm text-red-500">{errors.paymentMethod}</p>
//                 )}
//               </div>
//               {(formData.paymentMethod === "credit" ||
//                 formData.paymentMethod === "debit") && (
//                 <>
//                   <div className="space-y-2">
//                     <Label htmlFor="cardNumber">Card Number</Label>
//                     <div className="relative">
//                       <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="cardNumber"
//                         name="cardNumber"
//                         placeholder="1234 5678 9012 3456"
//                         value={formData.cardNumber}
//                         onChange={handleInputChange}
//                         className={`pl-8 ${
//                           errors.cardNumber ? "border-red-500" : ""
//                         }`}
//                         aria-invalid={errors.cardNumber ? "true" : "false"}
//                         aria-describedby={
//                           errors.cardNumber ? "cardNumber-error" : undefined
//                         }
//                       />
//                     </div>
//                     {errors.cardNumber && (
//                       <p id="cardNumber-error" className="text-sm text-red-500">
//                         {errors.cardNumber}
//                       </p>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="expiryDate">Expiry Date</Label>
//                       <Input
//                         id="expiryDate"
//                         name="expiryDate"
//                         placeholder="MM/YY"
//                         value={formData.expiryDate}
//                         onChange={handleInputChange}
//                         className={errors.expiryDate ? "border-red-500" : ""}
//                         aria-invalid={errors.expiryDate ? "true" : "false"}
//                         aria-describedby={
//                           errors.expiryDate ? "expiryDate-error" : undefined
//                         }
//                       />
//                       {errors.expiryDate && (
//                         <p
//                           id="expiryDate-error"
//                           className="text-sm text-red-500"
//                         >
//                           {errors.expiryDate}
//                         </p>
//                       )}
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="cvv">CVV</Label>
//                       <Input
//                         id="cvv"
//                         name="cvv"
//                         type="password"
//                         placeholder="123"
//                         value={formData.cvv}
//                         onChange={handleInputChange}
//                         className={errors.cvv ? "border-red-500" : ""}
//                         aria-invalid={errors.cvv ? "true" : "false"}
//                         aria-describedby={errors.cvv ? "cvv-error" : undefined}
//                       />
//                       {errors.cvv && (
//                         <p id="cvv-error" className="text-sm text-red-500">
//                           {errors.cvv}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </>
//               )}
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="agreeTerms"
//                   checked={formData.agreeTerms}
//                   onCheckedChange={handleCheckboxChange}
//                 />
//                 <label
//                   htmlFor="agreeTerms"
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   I agree to the terms and conditions
//                 </label>
//               </div>
//               {errors.agreeTerms && (
//                 <p className="text-sm text-red-500">{errors.agreeTerms}</p>
//               )}
//             </div>
//             <Alert className="mt-4">
//               <AlertCircle className="h-4 w-4" />
//               <AlertTitle>Important</AlertTitle>
//               <AlertDescription>
//                 Your registration fee is $50.00. This is a one-time payment for
//                 joining our community.
//               </AlertDescription>
//             </Alert>
//             <CardFooter className="flex justify-between mt-6 px-0">
//               <Button type="button" variant="outline" disabled={isLoading}>
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 disabled={isLoading || !formData.agreeTerms}
//               >
//                 {isLoading ? "Processing..." : "Pay $50.00"}
//               </Button>
//             </CardFooter>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }