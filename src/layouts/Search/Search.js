import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';
import AccountItems from '~/components/AccountItem/AccountItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import './Search.scss';
import useDebounce from '~/hooks/useDebounce';
import { fetchSearchUsers } from '~/service/fetchAPI';
function Search() {
    const [enterName, setEnterName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(enterName, 700);
    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            // const result = await axios.get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${debounced}&type=less`);
            const result = await fetchSearchUsers(debounced);
            setSearchResult(result.data);
            setLoading(false);
        };
        fetchApi();
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClickUser = () => {
        setEnterName('');
    };

    const handleChange = (e) => {
        const valueSearch = e.target.value;
        if (!valueSearch.startsWith(' ')) {
            setEnterName(valueSearch);
        }
    };
    // }
    return (
        <div>
            <TippyHeadless
                interactive
                visible={showResult && enterName.length > 0}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div aria-expanded="true" className="search-box" tabIndex="0" {...attrs}>
                        <Popper>
                            <h3 className="h3-account">Acounts</h3>
                            {searchResult.map((items) => {
                                return <AccountItems data={items} key={items.id} handleClickUser={handleClickUser} />;
                            })}
                        </Popper>
                    </div>
                )}
            >
                <div className="search">
                    <input
                        ref={inputRef}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleChange}
                        value={enterName}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!enterName && loading === false && (
                        <button
                            className="close"
                            onClick={() => {
                                setEnterName('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon icon={faSpinner} className="loading" />}
                    <div className="searchIcon">
                        <button className="btn-search" onMouseDown={(e) => e.preventDefault()}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;
