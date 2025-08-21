import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {

    it('renders correctly', () => {

        render(<Avatar src="/avatar.png" alt="User avatar" size={16} />);


        const img = screen.getByAltText('User avatar');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/avatar.png');

    });
});