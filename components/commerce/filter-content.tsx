import type { ShopperSearchTypes } from "commerce-sdk-isomorphic"
import { ScrollView, TouchableOpacity, View } from "react-native"
import Icon from "~/components/icon"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Checkbox } from "~/components/ui/checkbox"
import { Separator } from "~/components/ui/separator"
import { Skeleton } from "~/components/ui/skeleton"
import { Text } from "~/components/ui/text"
import { H3 } from "~/components/ui/typography"
import { cn } from "~/lib/utils"

const FiltersContent = ({
  refinements = [],
  productSorts = [],
  selectedRefinements = {},
  selectedSort,
  handleSelectedRefinement,
  handleOnSortChange,
  handleClearFilters,
  isLoading = false,
}: {
  refinements: ShopperSearchTypes.ProductSearchRefinement[]
  productSorts: ShopperSearchTypes.ProductSearchSortingOption[]
  selectedRefinements?: Record<string, string[]>
  selectedSort?: string
  handleSelectedRefinement: (attributeId: string, value: string) => void
  handleOnSortChange: (val: string) => void
  handleClearFilters: () => void
  isLoading?: boolean
}) => {
  const hasActiveFilters = Object.keys(selectedRefinements).length > 0
  const currentSort = selectedSort || productSorts[0]?.id

  // Helper function to check if a value is selected for a specific attribute
  const isValueSelected = (attributeId: string, value: string): boolean => {
    if (!selectedRefinements[attributeId]) return false
    return selectedRefinements[attributeId].includes(value)
  }

  // Helper function to handle filter removal from active filters
  const handleRemoveFilter = (attributeId: string, value: string) => {
    handleSelectedRefinement(attributeId, value)
  }

  // Helper function to get the display name for a filter value
  const getFilterDisplayName = (attributeId: string, value: string): string => {
    // Find the refinement for this attribute
    const refinement = refinements.find((r) => r.attributeId === attributeId)
    if (!refinement) return value

    // Find the value object to get the proper label
    const valueObj = refinement.values?.find((v) => v.value === value)
    return valueObj?.label || value
  }

  // Loading placeholders
  if (isLoading && (!refinements.length || !productSorts.length)) {
    return (
      <View className="space-y-6 p-4">
        {/* Sort Section Placeholder */}
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-4">
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                <View className="flex-row gap-2 py-1">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 min-w-[100px] rounded-full" pulse />
                  ))}
                </View>
              </ScrollView>
            </View>
          </CardContent>
        </Card>

        {/* Filter Sections Placeholders */}
        {[1, 2, 3].map((i) => (
          <Card key={`placeholder-${i}`} className="border-0 bg-transparent shadow-none">
            <CardContent className="p-4">
              <View className="gap-3">
                <Skeleton className="h-6 w-24 rounded-md" pulse />
                <Separator className="bg-muted/20" />
                <View className="gap-3 py-1">
                  {[1, 2, 3].map((j) => (
                    <View key={j} className="flex-row items-center justify-between">
                      <View className="flex-1 flex-row items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-sm" pulse />
                        <Skeleton className="h-4 w-32 rounded-md" pulse />
                      </View>
                      <Skeleton className="h-5 w-8 rounded-full" pulse />
                    </View>
                  ))}
                </View>
              </View>
            </CardContent>
          </Card>
        ))}

        <View className="items-center justify-center py-8">
          <Skeleton className="h-6 w-40 rounded-md mb-2" pulse />
          <Skeleton className="h-4 w-32 rounded-md" pulse />
        </View>
      </View>
    )
  }

  return (
    <View className="space-y-6 p-4">
      {/* Sort Section */}
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="p-4">
          <View className="gap-3">
            <View className="flex-row items-center gap-2">
              <Icon name="options" className="text-foreground" size={16} />
              <H3 className="font-medium">Sort by</H3>
            </View>

            {/* Horizontal ScrollView for Sort Options */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
              contentContainerStyle={{ paddingRight: 16, paddingVertical: 4 }}
            >
              <View className="flex-row gap-2">
                {productSorts.map((sort) => {
                  const isSelected = currentSort === sort.id
                  return (
                    <TouchableOpacity
                      key={sort.id}
                      onPress={() => handleOnSortChange(sort.id)}
                      className={cn(
                        "min-w-[100px] items-center rounded-full border px-4 py-2 shadow-sm",
                        isSelected ? "border-primary bg-primary" : "border-border bg-background",
                      )}
                    >
                      <Text
                        className={cn(
                          "text-center text-sm font-medium",
                          isSelected ? "text-primary-foreground" : "text-foreground",
                        )}
                        numberOfLines={1}
                      >
                        {sort.label}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </View>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-4">
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <H3 className="font-medium">Active Filters</H3>
                <TouchableOpacity onPress={handleClearFilters} className="p-2">
                  <Text className="text-sm font-medium text-primary">Clear all</Text>
                </TouchableOpacity>
              </View>

              {/* Active Filter Tags */}
              <View className="flex-row flex-wrap gap-2 pt-1">
                {Object.entries(selectedRefinements).map(([attributeId, values]) =>
                  values.map((value) => (
                    <Badge
                      key={`active-${attributeId}-${value}`}
                      variant="secondary"
                      className="flex-row items-center gap-1 pr-1 shadow-sm"
                      asChild
                    >
                      <TouchableOpacity
                        onPress={() => handleRemoveFilter(attributeId, value)}
                        activeOpacity={0.7}
                        className="flex-row items-center"
                      >
                        <Text className="text-xs">{getFilterDisplayName(attributeId, value)}</Text>
                        <View className="ml-1 rounded-full bg-secondary-foreground/20 p-1">
                          <Icon name="close" size={10} className="text-secondary-foreground" />
                        </View>
                      </TouchableOpacity>
                    </Badge>
                  )),
                )}
              </View>
            </View>
          </CardContent>
        </Card>
      )}

      {/* Filter Sections */}
      {refinements
        .filter((r) => r.values && r.values.length > 0)
        .map((refinement, index) => (
          <Card key={`refinement-${refinement.attributeId}-${index}`} className="border-0 bg-transparent shadow-none">
            <CardContent className="p-4">
              <View className="gap-3">
                <H3 className="font-medium">{refinement.label}</H3>
                <Separator />

                {/* Scrollable Filter Options */}
                <ScrollView
                  className="max-h-48"
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{ paddingVertical: 4 }}
                >
                  <View className="gap-3">
                    {refinement.values?.map((val, i) => {
                      const isSelected = isValueSelected(refinement.attributeId, val.value)

                      return (
                        <TouchableOpacity
                          key={`filter-${refinement.attributeId}-${val.value}-${i}`}
                          onPress={() => {
                            handleSelectedRefinement(refinement.attributeId, val.value)
                          }}
                          className="flex-row items-center justify-between"
                          activeOpacity={0.7}
                        >
                          <View className="flex-1 flex-row items-center gap-3">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => {
                                handleSelectedRefinement(refinement.attributeId, val.value)
                              }}
                            />
                            <Text className="flex-1 text-sm" numberOfLines={2}>
                              {val.label || val.value}
                            </Text>
                          </View>
                          <Badge variant="outline" className="ml-2">
                            <Text className="text-xs">{val.hitCount}</Text>
                          </Badge>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </ScrollView>
              </View>
            </CardContent>
          </Card>
        ))}

      {/* Reset Button */}
      <Button variant="outline" className="w-full shadow-sm" onPress={handleClearFilters}>
        <View className="flex-row items-center gap-2">
          <Icon name="refresh" className="text-foreground" size={16} />
          <Text>Reset All Filters</Text>
        </View>
      </Button>

      {/* Loading Overlay */}
      {isLoading && (
        <View className="absolute inset-0 items-center justify-center bg-background/80">
          <View className="bg-background p-6 rounded-lg shadow-lg items-center">
            <Skeleton className="h-12 w-12 rounded-full mb-4" pulse />
            <Text className="text-primary font-medium">Updating filters...</Text>
          </View>
        </View>
      )}

      {/* Bottom Spacing for Safe Area */}
      <View className="h-8" />
    </View>
  )
}

export default FiltersContent
