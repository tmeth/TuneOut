import { loadStripe } from "@stripe/stripe-js";

// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_51Rpbfv0JV9IgDS6iihcIw1rPmLOO24ixosK1L4V6yh4R5o6S17OT87l4fcb4hVSOXjjvKX31XO8744DqNJwCt4xy00cZBDLVuO");

const SubscriptionButton = () => {
  const handleSubscribe = async () => {
    try {
      const priceID = "price_1RsZz40JV9IgDS6ilrHwT1p9"; 
      const res = await fetch('https://qdwxphfqt6.execute-api.us-east-1.amazonaws.com/stripeSubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceID }),
      });

      console.log("Raw response:", res);
      
      const data = await res.json();
      console.log("Parsed data:", data);

      if (!data.id) {
        alert(`Failed to create checkout session: ${data.error || 'Unknown error'}`);
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error(error);
        alert(error.message);
      }
    } catch (err) {
      console.error("Caught error:", err);
      alert('Failed to initiate subscription.');
    }
  };

  return (
    <button onClick={handleSubscribe} className="btn btn-success">
      Subscribe Now – $9.99/month
    </button>
  );
};

export default SubscriptionButton;