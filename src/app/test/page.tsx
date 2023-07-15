'use client';

import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FC, useEffect, useRef, useState } from 'react'

interface pageProps {
  
}

const Page: FC<pageProps> = ({}) => {
  const chatId = 'clij5fuau000duay8h4wi2vcx'
  const [messages, setMessages] = useState<any[]>([])
  const lastPostRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const res = await axios.get(`/api/prisma/message?chatId=${chatId}&page=0`)
  //     if (res) {
  //       setInitial(res);
  //     }
  //   };
  //   if (initial.length === 0) {
  //     fetchdata();
  //   }
  // }, []);

  useEffect(() => {
    if (messages.length <= 0) {
      fetchNextPage()
    }
  }, [])

  const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    ['messages', chatId],
    async ({pageParam = 0}) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        if (pageParam > 13) return
        const {data} = await axios.get(`/api/prisma/message?chatId=${chatId}&page=${pageParam}`)
        console.log(data)
        // setMessages(
        //   data?.pages
        //     .map((page:any) => page)
        //     .flat()
        //     .reverse() || []
        // );
        if (data.length > 0) {
          setMessages((prev) => [...prev, ...data].reverse())
        }
        return data
    },
    {
        getNextPageParam: (_, pages) => pages.length * 5,
    })
  
  // setMessages(data?.pages.map((page) => page).flat().reverse() || [])
  const {ref, entry} = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  if (entry?.isIntersecting && !isFetchingNextPage) fetchNextPage()

  return (
    <div className='min-h-screen bg-sidebar-bg'>
      <div className='flex-col-reverse'>
        {messages.length > 0 && messages.map((message : any, index) => 
            <div ref={index === 0 ? ref : null} key={message.id} className='h-48'>
              {message.text}
            </div>
        )}
      </div>
      {/* <button onClick={() => fetchNextPage()}>Load more</button> */}
    </div>
  )
};

export default Page;
