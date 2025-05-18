import { Link , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSubdomain } from "../services/subdomainService";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
 const  navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const userinfo = useSelector((state) => state.auth);
  const addPayPalScript = async () => {
    if (!document.querySelector('script[src="https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID"]')) {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID";
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    } else {
      setSdkReady(true);
    }
  };
  useEffect(() => {
    if (!userinfo ) {
      navigate("/login");
    }
  }, [userinfo, navigate]);


  useEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const handlePayment = () => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "15.00", // Replace with the total price of the cart
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(async (details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            await createSubdomain(cartItems[0]);
          });
        },
        onError: (err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render("#paypal-button-container");
    } else {
      alert("PayPal SDK not loaded. Please refresh the page.");
    }
  };

  return (
    <>
      <div className="container flex justify-around items-start flex wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-32 mt-24">Purchasing Subdomain</h1>

              {cartItems[0] && (
                <div className="flex items-center justify-center mb-[1rem] pb-2">
                  <div className="flex w-[10rem] h-[10rem]">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-16">
                    <div className="mt-2 text-white font-bold">$ 15</div>
                    <div>IP Address: {cartItems[0].ipaddress}</div>
                    <div>Record: {cartItems[0].record}</div>
                    <div>Owner: {cartItems[0].owner}</div>
                  </div>
                </div>
              )}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  {!sdkReady ? (
                    <div>Loading PayPal...</div>
                  ) : (
                    <div id="paypal-button-container"></div>
                  )}
                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 mt-16 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={handlePayment}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;