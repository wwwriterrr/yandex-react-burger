import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients.module.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../services/store';
import { translateGroup } from '../../core/utils';


export const IngredientsTabs = () => {
    const [current, setCurrent] = useState<string | null>(null);
    const [tabs, setTabs] = useState<string[]>([]);

    const loading = useAppSelector(state => state.ingredients.ingredientsLoading);
    const error = useAppSelector(state => state.ingredients.ingredientsError);
    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    useEffect(() => {
        if(ingredients.length){
            const groups: string[] = [];
            ingredients.map(item => {
                if(!groups.includes(item.type)) groups.push(item.type);
            })

            setCurrent(groups[0]);
            setTabs(groups);
        }else{
            setTabs([]);
            setCurrent(null);
        }
    }, [ingredients]);

    const tabClickHandler = (value: string) => {
        setCurrent(value);
        console.log(value);

        const tabTitle = document.getElementById(`group-${value}`);
        if(!tabTitle) return;

        tabTitle.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className={styles.tabs}>
            {loading ? (
                <div>Loading ...</div>
            ) : error ? null : (
                <>
                    {tabs.length ? (
                        <>
                            {tabs.map((tab, index) => (
                                <Tab key={`tab-${index}`} value={tab} active={current === tab} onClick={tabClickHandler}>{translateGroup(tab)}</Tab>
                            ))}
                        </>
                    ) : null}
                </>
            )}
        </div>
    )
}