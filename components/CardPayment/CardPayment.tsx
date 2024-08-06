import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Skeleton from "../Skeleton/Skeleton";
import Button from "../Button/Button";
import { cn } from "../../util";
import TransactionOutcomeModal from "../TransactionOutcomeModal/TransactionOutcomeModal";

type PaymentIntentResponse = {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: {
    tip: Record<string, unknown>;
  };
  amount_received: number;
  application: string | null;
  application_fee_amount: number | null;
  automatic_payment_methods: {
    allow_redirects: string;
    enabled: boolean;
  };
  canceled_at: number | null;
  cancellation_reason: string | null;
  capture_method: string;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: string;
  description: string | null;
  invoice: string | null;
  last_payment_error: any; // Consider defining a more specific type if structure is known
  latest_charge: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  next_action: any | null; // Consider defining a more specific type if structure is known
  on_behalf_of: string | null;
  payment_method: string;
  payment_method_configuration_details: any | null; // Consider defining a more specific type if structure is known
  payment_method_options: {
    card: {
      installments: any | null; // Consider defining a more specific type if structure is known
      mandate_options: any | null; // Consider defining a more specific type if structure is known
      network: string | null;
      request_three_d_secure: string;
    };
  };
  payment_method_types: string[];
  processing: any | null; // Consider defining a more specific type if structure is known
  receipt_email: string | null;
  review: any | null; // Consider defining a more specific type if structure is known
  setup_future_usage: any | null; // Consider defining a more specific type if structure is known
  shipping: any | null; // Consider defining a more specific type if structure is known
  source: any | null; // Consider defining a more specific type if structure is known
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: string;
  transfer_data: any | null; // Consider defining a more specific type if structure is known
  transfer_group: string | null;
};

const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CustomCardElement = () => {
  return (
    <div className="p-6 mt-8 bg-white rounded-lg box-shadow">
      <label className="text-lg font-semibold text-gray-700 mb-4">Add a New Payment Method</label>
      <div className="p-3 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <CardElement
          options={cardElementOptions}
          className="block w-full bg-white text-gray-700 focus:outline-none"
        />
      </div>
    </div>
  );
};

export const CardPayment = ({
  className,
  hideAddPaymentMethod = false,
  isMakingPayment = true,
  amountEur,
  offer,
}: {
  className?: string;
  isMakingPayment?: boolean;
  hideAddPaymentMethod?: boolean;
  amountEur?: number;
  offer: any;
}) => {
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [preferredPaymentMethod, setPreferredPaymentMethod] = useState();
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const handlePreferredChange = (id: string) => {
    // Call your function here
    onPreferredMethodChange(id);
  };

  const onPreferredMethodChange = async (id: string) => {
    console.log(`Preferred payment method changed to: ${id}`);
    try {
      // Call your function here
      await Moralis.Cloud.run("setPreferredPaymentMethod", {
        paymentMethodId: id,
      });
      retrievePaymentMethods();
    } catch (error) {
      console.error(error);
    }
    // Your function logic here
  };

  const { user, Moralis, refetchUserData } = useMoralis();

  const retrievePaymentMethods = async () => {
    const PMQuery = new Moralis.Query("PaymentMethod");
    PMQuery.equalTo("user", user);
    const methods = await PMQuery.find();
    setPaymentMethods(methods);
  };

  const retrievePayments = async () => {
    const paymentsQuery = new Moralis.Query("Payment");
    paymentsQuery.equalTo("user", user);
    const results = await paymentsQuery.find();
    setPayments(results);
  };

  useEffect(() => {
    if (user) {
      refetchUserData();
      retrievePaymentMethods();
      retrievePayments();
    }
  }, [user]);

  const params = useSearchParams();
  // const pathname = usePathname();
  // const [counts, setCounts] = useState(0);

  // useEffect(() => {
  //   setCounts((prev) => prev + 1);
  // }, [params, pathname]);

  // useEffect(() => {
  //   console.log(counts, params, pathname, "logs");
  // }, [counts]);

  async function attemptPay() {
    try {
      const order = await Moralis.Cloud.run("attemptStripePayment", {
        amountEur,
        selectedOffer: offer,
      });
      console.log(order);

      setPaymentModalIsOpen(false);
      setTransactionModalOpen(true);
      // alert("Payment successful - check courses area");
      // setTimeout(() => {
      //   window.location.href = "/profile";
      // });
    } catch (error) {
      alert(error);
    }
  }
  // {"brand":"visa","checks":{"address_line1_check":null,"address_postal_code_check":"pass","cvc_check":"pass"},"country":"US","display_brand":"visa","exp_month":12,"exp_year":2055,"fingerprint":"5fr0FIa9zaDgC14D","funding":"credit","generated_from":null,"last4":"4242","networks":{"available":["visa"],"preferred":null},"three_d_secure_usage":{"supported":true},"wallet":null}

  // Render the component wrapped with Stripe's Elements provider

  console.log(paymentMethods);

  return (
    <>
      <TransactionOutcomeModal
        amountEur={amountEur}
        isOpen={transactionModalOpen}
        onOpenChange={setTransactionModalOpen}
        txHash={"card"}
        discount={5}
      />
      <div className={cn("bg-white box-shadow rounded p-6 w-full my-10", className)}>
        <div>
          <p className=" md:text-lg font-semibold text-gray-700 mb-4">Saved Payment Methods</p>
          {/* <Skeleton count={3} /> */}

          <ul className="space-y-3">
            {paymentMethods.length < 1 && <p>There are no configured payment methods.</p>}
            {paymentMethods.map((method) => (
              <label
                htmlFor={method.id}
                key={method.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md"
              >
                <div className="flex items-center w-full">
                  {isMakingPayment && (
                    <input
                      id={method.id}
                      type="radio"
                      name="preferredPaymentMethod"
                      checked={method.get("isDefault")}
                      onChange={() => handlePreferredChange(method.id)}
                      className="mr-3"
                    />
                  )}
                  <div className="text-gray-600 w-full flex items-center justify-between font-medium">
                    <div>
                      [{method.get("card").brand?.toUpperCase()}] ending in **** {method.get("card").last4}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                      &mdash; Expires {method.get("card").exp_month}/{method.get("card").exp_year}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </ul>
        </div>

        {/* <p className="text-lg font-semibold text-gray-700 mb-4">
          Past Payments
        </p> */}
        {/* <ul>
      
        {payments.map((payment) => (
          <li key={payment.id}>
            ${(payment.get("data")?.amount / 100).toLocaleString()} &mdash;
            Status: {payment.get("data")?.status}
          </li>
        ))}
      </ul> */}
        {isMakingPayment && (
          <Button
            onClick={attemptPay}
            className="mt-4 text-lg px-8 mx-auto uppercase font-bold"
          >
            PAY NOW &mdash; {amountEur}€
          </Button>
        )}

        {/* <button onClick={handleSignOut}>Sign Out</button> */}

        {<AddPaymentMethodForm retrievePaymentMethods={retrievePaymentMethods} />}

        {/* <button
          className="mt-5 bg-blue-500 text-white p-2 rounded-md"
          onClick={async () => {
            const result = await Moralis.Cloud.run("createNewPayment");
            console.log(result);
          }}
        >
          test out payment form
        </button> */}
      </div>
    </>
  );
};

const AddPaymentMethodForm = ({ retrievePaymentMethods }: { retrievePaymentMethods: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user, Moralis } = useMoralis();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardSetup(user?.get("setupSecret"), {
      payment_method: {
        // @ts-ignore
        card: cardElement,
        billing_details: { name: "Cardholder Name" },
      },
    });

    console.log(result);

    let setupIntent = result.setupIntent;

    if (!setupIntent) {
      alert("Setup intent not found");
      return;
    }

    await Moralis.Cloud.run("addNewPaymentMethod", {
      userId: user?.id,
      paymentMethodId: setupIntent.payment_method,
    });

    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Payment method added!");
      retrievePaymentMethods();
      // Add new payment method to Parse database
    }
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <div className="mt-4 mb-8">
        <CustomCardElement />
      </div>

      <Button
        type="submit"
        className="mx-auto text-[1rem]"
        // disabled={!stripe}
      >
        Add New Payment Method
      </Button>
    </form>
  );
};
