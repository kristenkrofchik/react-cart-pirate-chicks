import React from 'react';
import { render } from "@testing-libary/react";
import App from './App';

it("renders without crashing", function() {
    render(<App />);
  });

it('should take a snapshot', function() {
  const { asFragment } = render(<App />)
    
  expect(asFragment(<App />)).toMatchSnapshot()
  });