"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay';
import messages from "@/messages.json"
import carouselImages from "@/carouselImages.json"
import { Mail } from "lucide-react"
import Image from "next/image"

const Home = () => {
  return (
    <div className="flex flex-col min-h-full">
      <main className='flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>
        <section className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl font-bold'>Dive into the World of Anonymous Conversations</h1>
          <p className='mt-3 md:mt-4 text-base md:text-lg text-blue-900 font-semibold'>Explore Mystery Text - Where Everything is a Mystery</p>
        </section>

        {/* Image Carousel */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl mb-8"
        >
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <div className="relative h-56 w-full overflow-hidden rounded-md">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-center">{image.alt}</CardTitle>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white mt-auto">
        © 2025 True Feedback. All rights reserved.
      </footer>
    </div>
  )
}

export default Home