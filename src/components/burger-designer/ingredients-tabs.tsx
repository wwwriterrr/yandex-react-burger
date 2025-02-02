import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients.module.css';
import React, { RefObject, useEffect, useState } from 'react';
import { useAppSelector } from '../../services/store';
import { translateGroup } from '../../core/utils';

export const IngredientsTabs = React.forwardRef<HTMLDivElement>((_, ref) => {
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

    useEffect(() => {
        const list = (ref as RefObject<HTMLDivElement>).current;

        if(!list) return;

        const scrollHandler = () => {
            const scrollTop = list.scrollTop;
            const containerOffset = (list.clientHeight as number) / 2;
            if(!scrollTop || !containerOffset) return;
            const titles: NodeListOf<HTMLHeadingElement> = list.querySelectorAll('h3');

            titles?.forEach((title) => {
                const type = title.getAttribute('data-type');
                const offset = title.offsetTop;
                if(!type || !offset) return;
                
                if(scrollTop+containerOffset >= offset) setCurrent(type);
            });
        }

        list.addEventListener('scroll', scrollHandler);

        return () => {
            list.removeEventListener('scroll', scrollHandler);
        }
    }, [ref, ingredients])

    const tabClickHandler = (value: string) => {
        setCurrent(value);

        const tabTitle = document.getElementById(`group-${value}`);
        const container = (ref as RefObject<HTMLDivElement>).current;
        if(!tabTitle || !container) return;

        container?.scrollTo({top: tabTitle.offsetTop, behavior: 'smooth'});
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
})
