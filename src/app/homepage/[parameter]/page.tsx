import React from 'react';
import HomePage from '../page';

export default function Page({ params }: { params: { parameter: string } }) {
  return (
    <div>
      <HomePage parameter={params.parameter} />
    </div>
  );
} 