import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import HeroSection from '@/components/HeroSection'
import PlatformLinks from '@/components/PlatformLinks'
import CategoryNavigation from '@/components/CategoryNavigation'
import FeaturedRecipes from '@/components/FeaturedRecipes'
import LatestRecipes from '@/components/LatestRecipes' // 반드시 import 확인

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  // 1. 추천 레시피 가공 (featured: true 우선)
  const featuredPostsRaw = posts.filter((post) => post.featured === true)
  const displayFeatured =
    featuredPostsRaw.length > 0 ? featuredPostsRaw.slice(0, 4) : posts.slice(0, 4)

  const featuredRecipes = displayFeatured.map((post) => ({
    title: post.title,
    slug: post.slug,
    thumbnail: post.thumbnail,
    time: post.time || '15분',
    difficulty: post.difficulty || 3,
    summary: post.summary,
  }))

  // 2. 최신 레시피 가공
  const latestPosts = posts.slice(0, MAX_DISPLAY).map((post) => ({
    ...post,
    thumbnail: post.thumbnail,
    difficulty: post.difficulty || 3,
    time: post.time || '10분',
  }))

  return (
    <>
      {/* 1. 히어로 섹션 */}
      <HeroSection channelName={siteMetadata.headerTitle || '레시피 채널'} />

      {/* 2. 플랫폼 바로가기 (유튜브, 인스타 등) */}
      <PlatformLinks />

      {/* 3. 추천 레시피 섹션 (가로 그리드) */}
      <FeaturedRecipes recipes={featuredRecipes} />

      {/* 4. 최신 레시피 섹션 (리스트 형태) - 이 부분이 누락되었었습니다! */}
      <LatestRecipes posts={latestPosts} />

      {/* 5. 카테고리 내비게이션 */}
      <CategoryNavigation />

      {/* 6. 모든 레시피 보기 버튼 */}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center bg-gray-50 pb-20 dark:bg-gray-900/50">
          <Link
            href="/blog"
            className="rounded-xl border-2 border-gray-200 bg-white px-8 py-3 font-bold text-gray-900 shadow-sm transition-all hover:border-orange-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-orange-400"
          >
            모든 레시피 보기 →
          </Link>
        </div>
      )}
    </>
  )
}
