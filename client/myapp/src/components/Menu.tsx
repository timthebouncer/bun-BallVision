import { Button, Drawer, Menu, Space } from "antd";
import MenuFoldOutlined from "@ant-design/icons/lib/icons/MenuFoldOutlined";
import { useState } from "react";
import ballLogo from "/ballLogo-round.png";

const MenuComponent = ({ ...props }) => {
	console.log(props, "props");
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
				<p className="text-white">熱門影片</p>
				<p className="text-white">最新影片</p>
				<p className="text-white">Some contents...</p>
			</Drawer>
		</div>
	);
};
export default MenuComponent;
