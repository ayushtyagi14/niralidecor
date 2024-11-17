import React from 'react';

const Explore = ({ serviceName }) => {
    const services = [
        'Wedding',
        'Reception',
        'Vidhi & Haldi',
        'Sangeet & Garba',
        'Centerpiece',
    ];

    // Filter out the service that matches the serviceName prop
    const filteredServices = services.filter(service => service !== serviceName);

    return (
        <div>
            <h1>Explore Our Other Services:</h1>
            <div>
                {filteredServices.map((service, index) => (
                    <button key={index}>{service}</button>
                ))}
            </div>
        </div>
    );
};

export default Explore;
