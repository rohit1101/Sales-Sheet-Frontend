import Layout from "../Layout";

const SignUp = () => {
  return (
    <Layout>
      <h1 className="text-lg my-8">Sign Up</h1>
      <form className="inline-block text-left">
        <label className="block">Username</label>
        <input className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300" />
        <label className="block">Password</label>
        <input className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300" />
        <div></div>
        <input type="submit" value="Sign Up" />
      </form>
    </Layout>
  );
};

export default SignUp;
