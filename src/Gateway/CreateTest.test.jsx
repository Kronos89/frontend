import React from 'react';
import { render, fireEvent, waitFor, screen  } from '@testing-library/react';
import axios from 'axios';
import CreateGateway from './CreateGateway';

jest.mock('axios');

describe('CreateGateway', () => {
    test('should render the form and submit data', async () => {
        render(<CreateGateway/>);


        const serialNumberInput = screen.getByLabelText(/Serial Number/i);
        const nameInput = screen.getByLabelText('Name');
        const ipAddressInput = screen.getByLabelText('Ip Address');
        const uidInput = screen.getByLabelText('UID');
        const vendorInput = screen.getByLabelText('Vendor');
        const statusInput = screen.getByLabelText('Status');

        fireEvent.change(serialNumberInput, { target: { value: '123456' } });
        fireEvent.change(nameInput, { target: { value: 'Test Gateway' } });
        fireEvent.change(ipAddressInput, { target: { value: '1.1.1.1' } });
        fireEvent.change(uidInput, { target: { value: '1234' } });
        fireEvent.change(vendorInput, { target: { value: 'Test Vendor' } });
        fireEvent.change(statusInput, { target: { value: 'offline' } });


        const submitButton = screen.getByText('Create');

        axios.post.mockResolvedValueOnce({ data: {} });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:4000/gateway', {
                serialNumber: '123456',
                name: 'Test Gateway',
                ipAddress: '1.1.1.1',
                peripherals: [
                ],
            });
        });
    });
});