import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MenuCard } from '@/modules/transaction/components/molecules/MenuCard';
import { Text } from 'react-native';

describe('MenuCard', () => {
    it('renders correctly', () => {
        const onPress = jest.fn();
        const { getByText } = render(
            <MenuCard
                icon={<Text>Icon</Text>}
                title="Cards"
                description="Manage cards"
                onPress={onPress}
            />
        );
        expect(getByText('Cards')).toBeTruthy();
        expect(getByText('Manage cards')).toBeTruthy();

        fireEvent.press(getByText('Cards'));
        expect(onPress).toHaveBeenCalled();
    });
});
