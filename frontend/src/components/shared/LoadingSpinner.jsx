import React from "react";
import Layout from './Layout';
import './LoadingSpinner.styles.css';

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <Layout>
      <div className="LoadingSpinner">
        Loading ...
      </div>
    </Layout>
  );
}

export default LoadingSpinner;