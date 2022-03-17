import React from 'react';
import { Box, Avatar, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
export default function App() {
	const [like, setLike] = React.useState(false);
	const [colorLike, setColorLike] = React.useState({ color: 'white' });
	const onLike = () => {
		setLike(!like);
		console.log(like);
		if (!like) {
			setColorLike({ color: 'blue.500' });
		} else {
			setColorLike({ color: 'white' });
		}
	};
	return (
		<Box d="flex">
			<Avatar
				name="Dan Abrahmov"
				mt="1"
				mr="2"
				src="https://bit.ly/dan-abramov"
			/>
			<Box>
				<Box d="flex">
					<Box borderRadius="20" bg="gray.700">
						<Text ml="4" mr="4" p="1">
							<strong>Lộc Fuho</strong> <br />
							Tối nay thi nha các em iu..
						</Text>
					</Box>
					{like && (
						<Box>
							<StarIcon pos="relative" top="10" right="8" color="blue.500" />
						</Box>
					)}
				</Box>
				<Text
					as="button"
					fontSize="14"
					ml="5"
					color={colorLike.color}
					onClick={onLike}>
					Like
				</Text>
				<Text as="button" fontSize="14" ml="5">
					Reply
				</Text>
			</Box>
		</Box>
	);
}

export default App