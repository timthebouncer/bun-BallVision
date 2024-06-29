import { Button, Drawer, Menu, MenuProps, Space } from "antd";
import MenuFoldOutlined from "@ant-design/icons/lib/icons/MenuFoldOutlined";
import { useState } from "react";
import ballLogo from "/ballLogo-round.png";


type MenuItem = Required<MenuProps>['items'][number];
interface LevelKeysProps {
	key?: string;
	children?: LevelKeysProps[];
}

const items: MenuItem[] = [
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

const MenuComponent = ({ ...props }) => {
	const [open, setOpen] = useState(false);

	const [stateOpenKeys, setStateOpenKeys] = useState(['1']);

	const getLevelKeys = (items1: LevelKeysProps[]) => {
		const key: Record<string, number> = {};
		const func = (items2: LevelKeysProps[], level = 1) => {
			items2.forEach((item) => {
				if (item.key) {
					key[item.key] = level;
				}
				if (item.children) {
					func(item.children, level + 1);
				}
			});
		};
		func(items1);
		return key;
	};

	const levelKeys = getLevelKeys(items as LevelKeysProps[]);

	const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
		const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
		// open
		if (currentOpenKey !== undefined) {
			const repeatIndex = openKeys
				.filter((key) => key !== currentOpenKey)
				.findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

			setStateOpenKeys(
				openKeys
					// remove repeat key
					.filter((_, index) => index !== repeatIndex)
					// remove current level all child
					.filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
			);
		} else {
			// close
			setStateOpenKeys([]);
		}
	};

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
		setStateOpenKeys([]);
	};

	return (
		<div>
			<Button
				type="primary"
				onClick={showDrawer}
				style={{ background: "transparent", fontSize: "20px", lineHeight: 1 }}
			>
				<MenuFoldOutlined />
			</Button>
			<Drawer
				closeIcon={false}
				style={{ background: "#251633" }}
				title={
					<div style={{ color: "#fff" }}>
						{" "}
						<div className="logo-wrapper">
							<a href="https://vitejs.dev">
								<img src={ballLogo} className="logo" alt="Vite logo" />
							</a>
							<h2>BBall_Vision</h2>
						</div>
					</div>
				}
				placement={"left"}
				width={300}
				onClose={onClose}
				open={open}
			>
				<Menu
					mode="inline"
					openKeys={stateOpenKeys}
					onOpenChange={onOpenChange}
					items={items}
					theme="dark"
				/>
			</Drawer>
		</div>
	);
};
export default MenuComponent;
