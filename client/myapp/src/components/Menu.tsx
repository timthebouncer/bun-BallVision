import { Button, Drawer } from 'antd';
import MenuFoldOutlined from '@ant-design/icons/lib/icons/MenuFoldOutlined';
import { useState } from 'react';
import ballLogo from '/ballLogo-round.png';


const items = [
	{
		key: '1',
		label: 'NBA',
		children: [
			{ key: '11', label: '熱門影片' },
			{ key: '12', label: '最新影片' },
		],
	},
	{
		key: '2',
		label: '台籃',
		children: [
			{ key: '21', label: '熱門影片' },
			{ key: '22', label: '最新影片' },
		],
	},
	{
		key: '3',
		label: '影片',
		children: [
			{ key: '31', label: '熱門影片' },
			{ key: '32', label: '最新影片' },
		],
	},
	{
		key: '4',
		label: '購物',
	},
];

const MenuComponent = () => {
	const [open, setOpen] = useState(false);


	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				type="primary"
				onClick={showDrawer}
				style={{ background: 'transparent', fontSize: '20px', lineHeight: 1 }}
			>
				<MenuFoldOutlined />
			</Button>
			<Drawer
				closeIcon={false}
				style={{ background: '#251633' }}
				title={
					<div style={{ color: '#fff' }}>
						<div className="logo-wrapper">
							<a href="/">
								<img src={ballLogo} className="logo" alt="BBall Vision Logo" />
							</a>
							<h2>BBall_Vision</h2>
						</div>
					</div>
				}
				placement="left"
				width={300}
				onClose={onClose}
				open={open}
			>
				<div className={'flex flex-col'}>
					{items.map((item) => (
						<Button
							key={item.key}
							className={'mb-4'}
						>
							{item.label}
						</Button>
					))}
				</div>

			</Drawer>
		</div>
	);
};

export default MenuComponent;