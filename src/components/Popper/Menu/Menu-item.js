function MenuItems({ items, onClickMenu }) {
    return (
        <>
            <div className="menuList" onClick={onClickMenu}>
                <span className="iconMenu">{items.icon}</span>
                <span className="title">{items.title}</span>
            </div>
        </>
    );
}

export default MenuItems;
