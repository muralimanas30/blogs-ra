import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import './HomeHeader.css';
import MenuButton from "../../../components/MenuButton/MenuButton";
import useMenuButton from "../../../components/MenuButton/MenuButtonHook";
import Filter from "./Filter";

const HomeHeader = ({ setFeedType, feedType, tags, setTags }) => {

    const inputElement = useRef(null);
    const { open: openMenuButton, setOpen: setMenuButtonOpen } = useMenuButton()

    const style1 = {
        maxHeight: '100px',
    }
    const style2 = {
        maxHeight: '500px',
    }
    const style3 = {
        color: 'tomato',
        letterSpacing: '1px', 
        textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)', 
        
    };
    
    return (
        <div className="home-header" style={openMenuButton ? style2 : style1}>
            <span style={openMenuButton ? style3 : {}}
            className="home-header-heading">{!openMenuButton?"Welcome Home!":"Customize Feed"} </span><MenuButton open={openMenuButton} setOpen={setMenuButtonOpen} />
            {openMenuButton ? (
                <Filter
                    setFeedType={setFeedType}
                    feedType={feedType}
                    tags={tags}
                    setTags={setTags}
                />) : null
            }
        </div>
    );
};

export default HomeHeader;
HomeHeader.displayName = 'HomeHeader';
HomeHeader.propTypes = {
    setFeedType: PropTypes.func.isRequired,
    feedType: PropTypes.bool,
    tags: PropTypes.string,
    setTags: PropTypes.func.isRequired
};